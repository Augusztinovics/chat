<template>
    <div class="resurce">
        <div v-if="groupUserDetail" class="detail-container">
            <div class="details-header">
                <h2><span v-if="groupUserDetail.id>0">#{{ groupUserDetail.id }}</span></h2>
                <div>
                    <button v-if="isEdit" class="btn btn-success mr-2" @click="saveDetail">Save</button>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="detail">
                <p><b>Group Id: </b><input type="number" name="group_id" :readonly="!isEdit" v-model="groupUserDetail.group_id"></p>
                <p><b>User Id: </b><input type="number" name="user_id" :readonly="!isEdit" v-model="groupUserDetail.user_id"></p>
                <p><b>Created At: </b>{{ groupUserDetail.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>Group Users</h2>
            <div class="resurce-control">
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="fetchGroupUsers">
                    <button type="button" @click="fetchGroupUsers" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchGroupUsers">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchGroupUsers">Fetch All Group Users</button>
                    <button v-if="canEdit" class="btn-sm btn-success ml-2" @click="createNewGroupUser">Create New Group User</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Group Id</th>
                    <th>User Id</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="groupUser in groupUsers" :key="groupUser.id">
                    <td>{{ groupUser.id }}</td>
                    <td>{{ groupUser.group_id }}</td>
                    <td>{{ groupUser.user_id }}</td>
                    <td>{{ groupUser.created_at }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewGroupUser(groupUser)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn ml-1" @click="viewEditGroupUser(groupUser)"><IconEdit /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteGroupUser(groupUser.id)"><IconX /></span>
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
                groupUsers: [],
                groupUserDetail: null,
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
                deleteGroupUserId: null,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            groupUserNum() {
                return this.groupUsers.length;
            },
            hasResult() {
                return this.groupUserNum > 0;
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
                this.fetchGroupUsers(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchGroupUsers(null, this.offset);
            },

            fetchGroupUsers(e,set = 1) {
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/group-users?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.groupUsers = r.data.group_users;
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

            viewGroupUser(groupUser) {
                this.groupUserDetail = groupUser;
            },

            viewEditGroupUser(groupUser) {
                this.isEdit = true;
                this.updateId = groupUser.id;
                this.groupUserDetail = { ...groupUser };
            },

            closeDetail() {
                this.isEdit = false;
                this.groupUserDetail = null;
                this.updateId = null;
            },

            createNewGroupUser() {
                this.isEdit = true;
                this.groupUserDetail = {
                    id: 0,
                    group_id:   null,
                    user_id:    null,
                    created_at: null,
                }
            },

            cancelAction() {
                this.showPswModal = false;
                this.confirmPsw = '';
                this.deleteGroupUserId = null;
            },

            performAction() {
                if (this.confirmPsw.length < 1) {
                    this.missingPassword = true;
                    return;
                }
                let data = null;
                if (this.deleteGroupUserId) {
                    data = {
                        method: 'DELETE',
                        psw: this.confirmPsw,
                        delete_id: this.deleteGroupUserId
                    };
                    this.postData(data);
                } else if (this.isEdit && this.groupUserDetail) {
                    if (this.groupUserDetail.id > 0 && this.updateId) {
                        data = {
                            method: 'UPDATE',
                            psw: this.confirmPsw,
                            group_user_id: this.groupUserDetail.id,
                        };
                        let originalGroupUser = this.groupUsers.find(gu => { return gu.id == this.updateId;});
                        if (!originalGroupUser) {
                            this.showPswModal = false;
                            this.updateId = null;
                            this.groupUserDetail = null;
                            this.confirmPsw = '';
                            this.errorMsg = 'Unable to find original group user!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 5000);
                            return;
                        }

                        let hasUpdateData = false;
                        if (originalGroupUser.group_id !== parseInt(this.groupUserDetail.group_id)) {
                            data.group_id = parseInt(this.groupUserDetail.group_id);
                            hasUpdateData = true;
                        }

                        if (originalGroupUser.user_id !== parseInt(this.groupUserDetail.user_id)) {
                            data.user_id = parseInt(this.groupUserDetail.user_id);
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

                        if (this.groupUserDetail.group_id) {
                            data.group_id = parseInt(this.groupUserDetail.group_id);
                        } else {
                            this.errorMsg = 'Group Id is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (this.groupUserDetail.user_id) {
                            data.user_id = parseInt(this.groupUserDetail.user_id);
                        } else {
                            this.errorMsg = 'User Id is required!';
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

            deleteGroupUser(id) {
                this.deleteGroupUserId = id;
                this.isEdit = false;
                this.updateId = null;
                this.groupUserDetail = null;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            saveDetail() {
                this.deleteGroupUserId = null;
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
                axios.post('/api/admin/group-users', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteGroupUserId = null;
                        this.confirmPsw = '';
                        this.fetchGroupUsers(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteGroupUserId = null;
                        this.updateId = null;
                        this.groupUserDetail = null;
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