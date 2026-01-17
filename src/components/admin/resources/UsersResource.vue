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
                <p><b>E-mail: </b><input type="text" name="email" :readonly="!isEdit" v-model="userDetail.email"></p>
                <p><b>Language: </b>{{ userDetail.lg }}</p>
                <p><b>Country: </b><input type="text" name="country" :readonly="!isEdit" v-model="userDetail.country"></p>
                <p><b>City: </b><input type="text" name="city" :readonly="!isEdit" v-model="userDetail.city"></p>
                <p><b>Description: </b><textarea name="description" :readonly="!isEdit" v-model="userDetail.description"></textarea></p>
                <p><b>IP: </b>{{ userDetail.ip }}</p>
                <p><b>Device Data: </b><span>{{ userDetail.device_data }}</span></p>
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
                    <select name="pag_size" id="pag_size" v-model="limit">
                        <option value="5">5 / page</option>
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
                <tr v-for="user in users">
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
            <div>
                Pagination {{ totalCount }}
            </div>
        </div>
    </div>
</template>
<script>
    import IconSearch from '@/components/icons/IconSearch.vue';
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import IconUser from '@/components/icons/IconUser.vue';
    import IconX from '@/components/icons/IconX.vue';
    import axios from 'axios';
    import { mapStores } from 'pinia';
    import { adminUserStore } from '@/stores/admin_user';
    import { loadingStore } from '@/stores/loadin';

    export default {
        components: {
            IconSearch,
            IconEyeOpen,
            IconEdit,
            IconUser,
            IconX,
        },

        data() {
            return {
                users: [],
                userDetail: null,
                isEdit: false,
                limit: 10,
                offset: 1,
                totalCount: 0,
                searchText: '',
                submitting: false,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
        },
        methods: {
            fetchUsers() {
                let params = {
                    s: 1,
                    l: parseInt(this.limit),
                    st: this.searchText,
                };

                axios.get('/api/admin/users?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.users = r.data.users;
                        this.totalCount = r.data.result_count;
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },
            viewUser(user) {
                this.userDetail = user;
            },
            viewEditUser(user) {
                this.isEdit = true;
                this.userDetail = { ...user };
            },
            closeDetail() {
                this.isEdit = false;
                this.userDetail = null;
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
            deleteUser(id) {
                //Confirmation firest, then do
            },
            saveUser() {
                //Confirmation firest, then do
            }
        },
    }
</script>