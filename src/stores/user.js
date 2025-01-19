import { defineStore } from 'pinia';
import axios from 'axios';

export const userStore = defineStore('user', {
    state: () => ({
        loaded: false,
        id: null,
        username: '',
        email: '',
        lg: 'HU',
        country: '',
        city: '',
        description: '',
        profileImg: null,
    }),

    actions: {
        load() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/user-data')
                    .then((res) => {
                        this.id = res.data.userId;
                        this.username = res.data.username;
                        this.email = res.data.userEmail;
                        this.lg = res.data.userLg;
                        this.country = res.data.userCountry;
                        this.city = res.data.userCity;
                        this.description = res.data.userDescription;
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

        updateUser(payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/resources/user-update', payload)
                .then((res) => {
                    this.id = res.data.userId;
                    this.username = res.data.username;
                    this.email = res.data.userEmail;
                    this.lg = res.data.userLg;
                    this.country = res.data.userCountry;
                    this.city = res.data.userCity;
                    this.description = res.data.userDescription;
                    this.profileImg = res.data.userProfileImg;
                    this.loaded = true;
                    resolve(true);
                })
                .catch((e) => {
                    if (e.response.status == 401) {
                        reject(401);
                    } else if (e.response.status == 417) {
                        reject(417);
                    } else if (e.response.status == 400) {
                        reject(e.response.data?.message);
                    } else {
                        reject(e);
                    }
                });
            });
        },

        deleteUser(payload) {
            return new Promise((resolve, reject) => {
                axios.post('/api/resources/user-delete', payload)
                .then(() => {
                    this.id = null;
                    this.username = '';
                    this.email = '';
                    this.lg = 'HU';
                    this.country = '';
                    this.city = '';
                    this.description = '';
                    this.profileImg = null;
                    this.loaded = false;
                    resolve(true);
                })
                .catch((e) => {
                    reject(e);
                });
            });
        },
    },
});