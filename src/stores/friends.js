import { defineStore } from 'pinia';
import axios from 'axios';

export const friendsStore = defineStore('friends', {
    state: () => ({
        friends: [],
        groups: [],
    }),

    getters: {
        numFriends: (state) => {
            return state.friends.length ?? 0;
        },
        numGroups: (state) => {
            return state.groups.length ?? 0;
        },
        allFriends: (state) => {
            return state.friends;
        },
        allGroups: (state) => {
            return state.groups;
        },
        getFriendData: (state) => {
            return (id) => {
                return state.friends.find(f => {return f.friendId == id});
            }
        },
    },

    actions: {
        loadFriends() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/friends')
                    .then((res) => {
                        this.friends = res.data?.friends ?? [];
                        this.groups = res.data?.groups ?? [];
                        console.log(this.groups);
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