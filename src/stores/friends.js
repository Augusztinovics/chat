import { defineStore } from 'pinia';
import axios from 'axios';
import { userStore } from './user';

export const friendsStore = defineStore('friends', {
    state: () => ({
        loaded: false,
        friends: [],
        groups: [],
        messages: [],
        activeChatBoxs: [],
        activeChatBox: null,
    }),

    getters: {
        isLoaded: (state) => {
            return state.loaded;
        },
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
                    messages: [],
                };
                g.users.forEach(gu => {
                    if (gu !== currentUser.id) {
                        let data = state.friends.find(f => {return f.friendId == gu});
                        if (data) {
                            oneCard.groupUsers.push(data);
                        }
                    }
                });
                if (state.messages[g.id]) {
                    state.messages[g.id].forEach(m => {
                        oneCard.messages.push(m);
                    });
                }
                cards.push(oneCard);
            });
            //TODO order by latest messages
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
                        this.loaded = true;
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
        },

        addMessageToGroup(payload) {
            if (this.messages[payload.group_id]) {
                this.messages[payload.group_id].push(payload);
            } else {
                this.messages[payload.group_id] = [payload];
            }
        },

        toogleChatbox(groupId) {
            let existingIndex = this.activeChatBoxs.indexOf(groupId);
            if (existingIndex !== -1) {
                this.activeChatBoxs.splice(existingIndex, 1);
                if (this.activeChatBox == groupId) {
                    this.activeChatBox = null;
                }
            } else {
                if (window.innerWidth < 750) {
                    this.activeChatBoxs = [groupId];
                } else {
                    this.activeChatBoxs.push(groupId);
                }
                this.activeChatBox = groupId;
            }
        },

        setAsActiveBox(groupId) {
            this.activeChatBox = groupId;
        },
    },
});