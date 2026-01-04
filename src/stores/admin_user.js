import { defineStore } from 'pinia';
import axios from 'axios';

export const adminUserStore = defineStore('adminUser', {
    state: () => ({
        loaded: false,
        confirmed: false,
        id: null,
        username: '',
        roleId: null,
        hasUpdatePassword: false,
        profileImg: null,
    }),

    actions: {
        load() {
            return new Promise((resolve,reject) => {
                axios.get('/api/admin/admin-user-data')
                    .then((res) => {
                        this.id = res.data.userId;
                        this.username = res.data.username;
                        this.roleId = res.data.roleId;
                        this.hasUpdatePassword = res.data.hasUpdatePassword;
                        this.profileImg = res.data.userProfileImg;
                        this.loaded = true;
                        resolve(true);
                    })
                    .catch((e) => {
                        if (e.response.status == 401) {
                            reject(401);
                        } else {
                            reject(e);
                        }
                    })
            });
        },
    },
});