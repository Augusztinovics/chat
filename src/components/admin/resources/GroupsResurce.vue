<template>
    <div class="resurce">
        <div v-if="groupDetail" class="detail-container">
            <div class="details-header">
                <h2><span>#{{ groupDetail.id }}</span></h2>
                <div>
                    <button v-if="isEdit" class="btn btn-success mr-2" @click="saveDetail">Save</button>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="detail">
                <p><b>Main User Id: </b><input type="number" name="main_user" :readonly="!isEdit" v-model="groupDetail.main_user"></p>
                <p><b>Group Name: </b><input type="text" name="group_name" :readonly="!isEdit" v-model="groupDetail.group_name"></p>
                <p><b>Created At: </b>{{ groupDetail.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>Groups</h2>
            <div class="resurce-control">
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="fetchGroups">
                    <button type="button" @click="fetchGroups" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchGroups">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchGroups">Fetch All Groups</button>
                    <button v-if="canEdit" class="btn-sm btn-success ml-2" @click="createNewGroup">Create New Group</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Main User Id</th>
                    <th>Group Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="group in groups" :key="group.id">
                    <td>{{ group.id }}</td>
                    <td>{{ group.main_user }}</td>
                    <td>{{ group.group_name }}</td>
                    <td>{{ group.created_at }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewGroup(group)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn ml-1" @click="viewEditGroup(group)"><IconEdit /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteGroup(group.id)"><IconX /></span>
                    </td>
                </tr>
            </table>
            <div v-if="hasResult" class="text-center mt-2">
                <button type="button" class="btn pag-btn" :disabled="offset == 1" @click="paginateLeft">&lt;</button>
                <span class="mr-1 ml-1">Page: {{ offset }} / {{ pageCount }} All Resource: {{ totalCount }}</span>
                <button type="button" class="btn pag-btn" @click="paginatRight" :disabled="offset >= pageCount">&gt;</button>
            </div>
        </div>

        <Modal 
            :show="showPswModal"
            size="sm"
            title="Confirmtion Admin Password"
            :showCancel="true"
            @close="cancelAction"
            @cancel="cancelAction"
            @ok="performAction"
        >
            <div>
                <label for="password_input">Admin Update Password<span>*</span></label>
                <div class="password-container">
                    <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="confirmPsw" @input="clearErrors">
                    <button type="button" @click="toogleShowPassword">
                        <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                    </button>
                </div>
                <p v-if="missingPassword" class="invalid-text">Please Enter your Admin Update Password!</p>
            </div>
        </Modal>

        <SuccessToast v-if="saveSuccess"/>
        <FailToast v-if="saveError":msg="errorMsg"/>
    </div>
</template>
<script>
    import IconSearch from '@/components/icons/IconSearch.vue';
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import IconUser from '@/components/icons/IconUser.vue';
    import IconX from '@/components/icons/IconX.vue';
    import IconEyeClose from '@/components/icons/IconEyeClose.vue';
    import axios from 'axios';
    import { mapStores } from 'pinia';
    import { adminUserStore } from '@/stores/admin_user';
    import { loadingStore } from '@/stores/loadin';
    import SuccessToast from '@/components/SuccessToast.vue';
    import FailToast from '@/components/FailToast.vue';
    import Modal from '@/components/Modal.vue';

    export default {
        components: {
            IconSearch,
            IconEyeOpen,
            IconEyeClose,
            IconEdit,
            IconUser,
            IconX,
            SuccessToast,
            FailToast,
            Modal,
        },

        data() {
            return {
                groups: [],
                groupDetail: null,
                isEdit: false,
                updateId: null,
                limit: 10,
                offset: 1,
                totalCount: 0,
                searchText: '',
                submitting: false,
                errorMsg: '',
                saveSuccess: false,
                saveError: false,
                showPswModal: false,
                confirmPsw: '',
                showPassword: false,
                missingPassword: false,
                deleteGroupId: null,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            groupNum() {
                return this.groups.length;
            },
            hasResult() {
                return this.groupNum > 0;
            },
            pageCount() {
                if (this.totalCount < 1) return 0;
                return Math.ceil(this.totalCount / this.limit);
            },
            passwordInputType() {
                return this.showPassword ? 'text' : 'password';
            },
        },
        methods: {
            clearErrors() {
                this.missingPassword = false;
            },

            toogleShowPassword() {
                this.showPassword = !this.showPassword;
            },

            paginateLeft() {
                if (this.offset < 2) return;
                this.offset--;
                this.fetchGroups(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchGroups(null, this.offset);
            },

            fetchGroups(e,set = 1) {
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/groups?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.groups = r.data.groups;
                        this.totalCount = r.data.result_count;
                        this.offset = set;
                        this.loadingStore.finishLoading();
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        console.log(e);
                        this.errorMsg = e.message;
                        this.saveError = true;
                        setTimeout(() => {
                            this.errorMsg = '';
                            this.saveError = false;
                        }, 5000);
                    })
            },

            viewGroup(group) {
                this.groupDetail = group;
            },

            viewEditGroup(group) {
                this.isEdit = true;
                this.updateId = group.id;
                this.groupDetail = { ...group };
            },

            closeDetail() {
                this.isEdit = false;
                this.groupDetail = null;
                this.updateId = null;
            },

            createNewGroup() {
                this.isEdit = true;
                this.groupDetail = {
                    id: 0,
                    main_user:  null,
                    group_name: null,
                    created_at: null,
                }
            },

            cancelAction() {
                this.showPswModal = false;
                this.confirmPsw = '';
                this.deleteGroupId = null;
            },

            performAction() {
                if (this.confirmPsw.length < 1) {
                    this.missingPassword = true;
                    return;
                }
                let data = null;
                if (this.deleteGroupId) {
                    data = {
                        method: 'DELETE',
                        psw: this.confirmPsw,
                        delete_id: this.deleteGroupId
                    };
                    this.postData(data);
                } else if (this.isEdit && this.groupDetail) {
                    if (this.groupDetail.id > 0 && this.updateId) {
                        data = {
                            method: 'UPDATE',
                            psw: this.confirmPsw,
                            group_id: this.groupDetail.id,
                        };
                        let originalGroup = this.groups.find(g => { return g.id == this.updateId;});
                        if (!originalGroup) {
                            this.showPswModal = false;
                            this.updateId = null;
                            this.groupDetail = null;
                            this.confirmPsw = '';
                            this.errorMsg = 'Unable to find original user!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 5000);
                            return;
                        }

                        let hasUpdateData = false;
                        if (originalGroup.main_user !== parseInt(this.groupDetail.main_user)) {
                            data.main_user = parseInt(this.groupDetail.main_user);
                            hasUpdateData = true;
                        }

                        if (originalGroup.group_name !== this.groupDetail.group_name.trim()) {
                            data.group_name = this.groupDetail.group_name.trim();
                            hasUpdateData = true;
                        }

                        if (hasUpdateData) {
                            this.postData(data);
                        } else {
                            this.errorMsg = 'Nothing to update!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }
                    } else {
                        data = {
                            method: 'CREATE',
                            psw: this.confirmPsw,
                        }

                        if (this.groupDetail.main_user) {
                            data.main_user = parseInt(this.groupDetail.main_user);
                        } else {
                            this.errorMsg = 'Main User Id is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (this.groupDetail.group_name && this.groupDetail.group_name.trim().length > 1) {
                            data.group_name = this.groupDetail.group_name.trim();
                        } else {
                            this.errorMsg = 'Group Name is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        this.postData(data);
                    }
                } else {
                    this.cancelAction();
                }
            },

            deleteGroup(id) {
                this.deleteGroupId = id;
                this.isEdit = false;
                this.updateId = null;
                this.groupDetail = null;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            saveDetail() {
                this.deleteGroupId = null;
                if (!this.isEdit) return;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            focusOnPassword() {
                setTimeout(() => {
                    document.getElementById('password_input').focus();
                }, 300);
            },

            postData(data) {
                this.loadingStore.startLoading();
                this.showPswModal = false;
                axios.post('/api/admin/groups', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteGroupId = null;
                        this.confirmPsw = '';
                        this.fetchGroups(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteGroupId = null;
                        this.updateId = null;
                        this.groupDetail = null;
                        this.confirmPsw = '';
                        console.log(e);
                        this.errorMsg = e.message;
                        this.saveError = true;
                        setTimeout(() => {
                            this.errorMsg = '';
                            this.saveError = false;
                        }, 5000);
                    });
            },
        },
    }
</script>