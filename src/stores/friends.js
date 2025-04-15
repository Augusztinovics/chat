import { defineStore } from 'pinia';
import axios from 'axios';

export const friendsStore = defineStore('friends', {
    state: () => ({
        friends: [],
    }),

    getters: {
        numFriends: (state) => {
            return state.friends.length ?? 0;
        },
        allFriends: (state) => {
            return state.friends;
        },
    },

    actions: {
        loadFriends() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/friends')
                    .then((res) => {
                        this.friends = res.data?.friends ?? [];
                        resolve(true);
                    })
                    .catch((e) => {
                        console.log(e);
                        if (e.response.status == 401) {
                            reject(401);
                        } else {
                            reject(e);
                        }
                    });
            });
        },
    },
});