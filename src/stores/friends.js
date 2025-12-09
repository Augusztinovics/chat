import { defineStore } from 'pinia';
import axios from 'axios';
import { userStore } from './user';

export const friendsStore = defineStore('friends', {
    state: () => ({
        friends: [],
        groups: [],
        messages: [],
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
        getGroupsData: (state) => {
            let cards = [];
            const currentUser = userStore();
            state.groups.forEach(g => {
                let oneCard = {
                    groupId: g.id,
                    groupName: g.group_name,
                    groupCreated: g.created_at,
                    owner: g.main_user == currentUser.id,
                    groupUsers: [],
                };
                g.users.forEach(gu => {
                    if (gu !== currentUser.id) {
                        let data = state.friends.find(f => {return f.friendId == gu});
                        if (data) {
                            oneCard.groupUsers.push(data);
                        }
                    }
                });
                cards.push(oneCard);
            });
            //TODO need to add messages to groups and order by latest messages
            return cards;
        },
    },

    actions: {
        loadFriends() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/friends')
                    .then((res) => {
                        this.friends = res.data?.friends ?? [];
                        this.groups = res.data?.groups ?? [];
                        this.messages = res.data?.messages ?? [];
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

        createGroup(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/create-group', payload)
                    .then(() => {
                        resolve(true);
                    })
                    .catch((e) => {
                        if (e.response.status == 401) {
                            reject(401);
                        } else {
                            reject(e);
                        }
                    });
            });
        },

        updateGroup(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/update-group', payload)
                    .then(() => {
                        resolve(true);
                    })
                    .catch((e) => {
                        if (e.response.status == 401) {
                            reject(401);
                        } else {
                            reject(e);
                        }
                    });
            });
        }
    },
});