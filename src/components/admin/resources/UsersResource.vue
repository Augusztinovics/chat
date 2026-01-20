<template>
    <div class="resurce">
        <div v-if="userDetail" class="detail-container">
            <div class="details-header">
                <h2><span>#{{ userDetail.id }}</span> <input type="text" name="username" :readonly="!isEdit" v-model="userDetail.username"></h2>
                <div>
                    <button v-if="isEdit" class="btn btn-success mr-2" @click="saveUser">Save</button>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="mt-2">
                <img v-if="userDetail.profile_img" :src="userDetail.profile_img" alt="Profile Image" class="profile-img md">
                <span v-else class="icon-lg"><IconUser /></span>
            </div>
            <div class="detail">
                <p v-if="userDetail.id == 0"><b>Password: </b><input type="text" name="pass" :readonly="!isEdit" v-model="userDetail.password"></p>
                <p><b>E-mail: </b><input type="text" name="email" :readonly="!isEdit" v-model="userDetail.email"></p>
                <p><b>Language: </b> <select name="user_lg" id="user_lg" :disabled="!isEdit" v-model="userDetail.lg">
                    <option value="HU">Magyar</option>
                    <option value="SR">Serbian</option>
                    <option value="EN">English</option>
                </select></p>
                <p><b>Country: </b><input type="text" name="country" :readonly="!isEdit" v-model="userDetail.country"></p>
                <p><b>City: </b><input type="text" name="city" :readonly="!isEdit" v-model="userDetail.city"></p>
                <p><b>Description: </b><textarea name="description" :readonly="!isEdit" v-model="userDetail.description"></textarea></p>
                <p><b>IP: </b><input type="text" name="ip" :readonly="!isEdit" v-model="userDetail.ip"></p>
                <p><b>Device Data: </b><textarea name="device_data" :readonly="!isEdit" v-model="userDetail.device_data"></textarea></p>
                <p><b>Created At: </b>{{ userDetail.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>Users</h2>
            <div class="resurce-control">
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="fetchUsers">
                    <button type="button" @click="fetchUsers" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchUsers">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchUsers">Fetch All Users</button>
                    <button v-if="canEdit" class="btn-sm btn-success ml-2" @click="createNewUser">Create New User</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Language</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.lg }}</td>
                    <td>{{ user.country }}</td>
                    <td>{{ user.city }}</td>
                    <td>{{ user.description }}</td>
                    <td>{{ user.created_at }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewUser(user)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn ml-1" @click="viewEditUser(user)"><IconEdit /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteUser(user.id)"><IconX /></span>
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
                users: [],
                userDetail: null,
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
                deleteUserId: null,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            usersNum() {
                return this.users.length;
            },
            hasResult() {
                return this.usersNum > 0;
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
                this.fetchUsers(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchUsers(null, this.offset);
            },

            fetchUsers(e,set = 1) {
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/users?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.users = r.data.users;
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

            viewUser(user) {
                this.userDetail = user;
            },

            viewEditUser(user) {
                this.isEdit = true;
                this.updateId = user.id;
                this.userDetail = { ...user };
            },

            closeDetail() {
                this.isEdit = false;
                this.userDetail = null;
                this.updateId = null;
            },

            createNewUser() {
                this.isEdit = true;
                this.userDetail = {
                    id: 0,
                    username:       null,
                    password:       null,
                    email:          null,
                    lg:             null,
                    country:        null,
                    city:           null,
                    description:    null,
                    profile_img:    null,
                    ip:             null,
                    device_data:    null,
                    created_at:     null,
                }
            },

            cancelAction() {
                this.showPswModal = false;
                this.confirmPsw = '';
                this.deleteUserId = null;
            },

            performAction() {
                if (this.confirmPsw.length < 1) {
                    this.missingPassword = true;
                    return;
                }
                let data = null;
                if (this.deleteUserId) {
                    data = {
                        method: 'DELETE',
                        psw: this.confirmPsw,
                        delete_id: this.deleteUserId
                    };
                    this.postData(data);
                } else if (this.isEdit && this.userDetail) {
                    //call some action  update if userDetail.id > 0 else create action
                    if (this.userDetail.id > 0 && this.updateId) {
                        data = {
                            method: 'UPDATE',
                            psw: this.confirmPsw,
                            user_id: userDetail.id,
                        };
                        let originalUser = this.users.find(u => { return u.id == this.updateId;});
                        if (!originalUser) {
                            this.showPswModal = false;
                            this.updateId = null;
                            this.userDetail = null;
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
                        if (originalUser.username !== userDetail.username.trim()) {
                            data.username = userDetail.username.trim();
                            hasUpdateData = true;
                        }

                        if (userDetail.email && originalUser.email !== userDetail.email) {
                            if (userDetail.email.trim().length > 6 && userDetail.email.includes('@')) {
                                data.email = userDetail.email.trim();
                                hasUpdateData = true;
                            }
                        }

                        if (originalUser.lg !== userDetail.lg) {
                            data.lg = userDetail.lg;
                            hasUpdateData = true;
                        }

                        if (userDetail.country && originalUser.country !== userDetail.country.trim()) {
                            data.country = userDetail.country.trim();
                            hasUpdateData = true;
                        }

                        if (userDetail.city && originalUser.city !== userDetail.city.trim()) {
                            data.city = userDetail.city.trim();
                            hasUpdateData = true;
                        }

                        if (userDetail.description && originalUser.description !== userDetail.description.trim()) {
                            data.description = userDetail.description.trim();
                            hasUpdateData = true;
                        }

                        if (userDetail.ip && originalUser.ip !== userDetail.ip.trim()) {
                            data.ip = userDetail.ip.trim();
                            hasUpdateData = true;
                        }

                        if (userDetail.device_data && originalUser.device_data !== userDetail.device_data.trim()) {
                            data.device_data = userDetail.device_data.trim();
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

                        if (userDetail.username && userDetail.username.trim().length > 0) {
                            data.username = userDetail.username.trim();
                        } else {
                            this.errorMsg = 'Username is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (userDetail.password && userDetail.password.trim().length > 0) {
                            data.password = userDetail.password.trim();
                        } else {
                            this.errorMsg = 'Password is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (userDetail.email && userDetail.email.trim().length > 6 && userDetail.email.includes('@')) {
                            data.email = userDetail.email.trim();
                        }

                        if (userDetail.lg) {
                            data.lg = userDetail.lg;
                        } else {
                            this.errorMsg = 'Language is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (userDetail.country && userDetail.country.trim().length > 0) {
                            data.country = userDetail.country.trim();
                        }

                        if (userDetail.city && userDetail.city.trim().length > 0) {
                            data.city = userDetail.city.trim();
                        }

                        if (userDetail.description && userDetail.description.trim().length > 0) {
                            data.description = userDetail.description.trim();
                        }

                        if (userDetail.ip && userDetail.ip.trim().length > 0) {
                            data.ip = userDetail.ip.trim();
                        }

                        if (userDetail.device_data && userDetail.device_data.trim().length > 0) {
                            data.device_data = userDetail.device_data.trim();
                        }

                        this.postData(data);
                    }
                } else {
                    this.cancelAction();
                }
            },

            deleteUser(id) {
                this.deleteUserId = id;
                this.isEdit = false;
                this.updateId = null;
                this.userDetail = null;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            saveUser() {
                this.deleteUserId = null;
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
                //TODO create the rout and controller!
                this.loadingStore.startLoading();
                this.showPswModal = false;
                axios.post('/api/admin/users', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteUserId = null;
                        this.confirmPsw = '';
                        this.fetchUsers(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteUserId = null;
                        this.updateId = null;
                        this.userDetail = null;
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