<template>
    <div class="resurce">
        <div v-if="adminUserDetail" class="detail-container">
            <div class="details-header">
                <h2><span v-if="adminUserDetail.id>0">#{{ adminUserDetail.id }}</span></h2>
                <div>
                    <button v-if="isEdit" class="btn btn-success mr-2" @click="saveDetail">Save</button>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="detail">
                <p><b>User Id: </b><input type="number" name="user_id" :readonly="!isEdit" v-model="adminUserDetail.user_id"></p>
                <p><b>Role Id: </b><input type="number" name="role_id" :readonly="!isEdit" v-model="adminUserDetail.role_id"></p>
                <p><b>Created At: </b>{{ adminUserDetail.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>Admin Users</h2>
            <div class="resurce-control">
                <div class="reource-search">
                    <div class="password-container">
                        <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="fetchAdminUsers">
                        <button type="button" @click="fetchAdminUsers" :disabled="submitting">
                            <span class="icon"><IconSearch /></span>
                        </button>
                    </div>
                    <div>
                        <select name="search_key" id="search_key" v-model="searchKey">
                            <option value="id">Model Id</option>
                            <option value="role_id">Role Id</option>
                            <option value="user_id">User Id</option>
                        </select>
                    </div>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchAdminUsers">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchAdminUsersAll">Fetch All Admin Users</button>
                    <button v-if="canEdit" class="btn-sm btn-success ml-2" @click="createNewAdminUser">Create New Admin User</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>User Id</th>
                    <th>Role Id</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="admin in adminUsers" :key="admin.id">
                    <td>{{ admin.id }}</td>
                    <td>{{ admin.user_id }}</td>
                    <td>{{ admin.role_id }}</td>
                    <td>{{ admin.created_at }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewAdminUser(admin)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn ml-1" @click="viewEditAdminUser(admin)"><IconEdit /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteAdminUser(admin.id)"><IconX /></span>
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
            IconX,
            SuccessToast,
            FailToast,
            Modal,
        },

        data() {
            return {
                adminUsers: [],
                adminUserDetail: null,
                isEdit: false,
                updateId: null,
                limit: 10,
                offset: 1,
                totalCount: 0,
                searchText: '',
                searchKey: 'role_id',
                submitting: false,
                errorMsg: '',
                saveSuccess: false,
                saveError: false,
                showPswModal: false,
                confirmPsw: '',
                showPassword: false,
                missingPassword: false,
                deleteAdminUserId: null,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            adminNum() {
                return this.adminUsers.length;
            },
            hasResult() {
                return this.adminNum > 0;
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
                this.fetchAdminUsers(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchAdminUsers(null, this.offset);
            },

            fetchAdminUsersAll() {
                this.searchText = '';
                this.fetchAdminUsers(null, this.offset);
            },

            fetchAdminUsers(e,set = 1) {
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                    sk: this.searchKey,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/admin-users?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.adminUsers = r.data.admin_users;
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

            viewAdminUser(admin) {
                this.adminUserDetail = admin;
            },

            viewEditAdminUser(admin) {
                this.isEdit = true;
                this.updateId = admin.id;
                this.adminUserDetail = { ...admin };
            },

            closeDetail() {
                this.isEdit = false;
                this.adminUserDetail = null;
                this.updateId = null;
            },

            createNewAdminUser() {
                this.isEdit = true;
                this.adminUserDetail = {
                    id: 0,
                    user_id:    null,
                    role_id:    null,
                    created_at: null,
                }
            },

            cancelAction() {
                this.showPswModal = false;
                this.confirmPsw = '';
                this.deleteAdminUserId = null;
            },

            performAction() {
                if (this.confirmPsw.length < 1) {
                    this.missingPassword = true;
                    return;
                }
                let data = null;
                if (this.deleteAdminUserId) {
                    data = {
                        method: 'DELETE',
                        psw: this.confirmPsw,
                        delete_id: this.deleteAdminUserId
                    };
                    this.postData(data);
                } else if (this.isEdit && this.adminUserDetail) {
                    if (this.adminUserDetail.id > 0 && this.updateId) {
                        data = {
                            method: 'UPDATE',
                            psw: this.confirmPsw,
                            admin_user_id: this.adminUserDetail.id,
                        };
                        let originalAdmin = this.adminUsers.find(au => { return au.id == this.updateId;});
                        if (!originalAdmin) {
                            this.showPswModal = false;
                            this.updateId = null;
                            this.adminUserDetail = null;
                            this.confirmPsw = '';
                            this.errorMsg = 'Unable to find original admin user!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 5000);
                            return;
                        }

                        let hasUpdateData = false;
                        if (originalAdmin.user_id !== parseInt(this.adminUserDetail.user_id)) {
                            data.user_id = parseInt(this.adminUserDetail.user_id);
                            hasUpdateData = true;
                        }

                       if (originalAdmin.role_id !== parseInt(this.adminUserDetail.role_id)) {
                            if (parseInt(this.adminUserDetail.role_id) < 1 || parseInt(this.adminUserDetail.role_id) > 2) {
                                this.errorMsg = 'Role Id must be 1 or 2!';
                                this.saveError = true;
                                setTimeout(() => {
                                    this.errorMsg = '';
                                    this.saveError = false;
                                }, 3000);
                                return;
                            }
                            data.role_id = parseInt(this.adminUserDetail.role_id);
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

                        if (this.adminUserDetail.user_id) {
                            data.user_id = parseInt(this.adminUserDetail.user_id);
                        } else {
                            this.errorMsg = 'User Id is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (this.adminUserDetail.role_id) {
                            data.role_id = parseInt(this.adminUserDetail.role_id);
                        } else {
                            this.errorMsg = 'Role Id is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if ( data.role_id < 1 ||  data.role_id > 2) {
                            this.errorMsg = 'Role Id must be 1 or 2!';
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

            deleteAdminUser(id) {
                this.deleteAdminUserId = id;
                this.isEdit = false;
                this.updateId = null;
                this.adminUserDetail = null;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            saveDetail() {
                this.deleteAdminUserId = null;
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
                axios.post('/api/admin/admin-users', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteAdminUserId = null;
                        this.confirmPsw = '';
                        this.fetchAdminUsers(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteAdminUserId = null;
                        this.updateId = null;
                        this.adminUserDetail = null;
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