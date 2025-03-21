import { defineStore } from 'pinia';
import axios from 'axios';

export const requestSendStore = defineStore('requestSend', {
    state: () => ({
        loaded: false,
        requests: [],
    }),

    getters: {
        numSendRequests: (state) => {
            return state.requests.length ?? 0;
        },
        isLoaded: (state) => {
            return state.loaded;
        },
        sendRequests: (state) => {
            return state.requests;
        },
    },

    actions: {
        loadRequests() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/sended-friend-requests')
                    .then((res) => {
                        this.requests = res.data?.sendedRequests ?? [];
                        this.loaded = true;
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

        sendRequest(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/friend-request-send', payload)
                    .then((res) => {
                        this.requests = res.data?.sendedRequests ?? [];
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

        cancelFrienRequest(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/friend-request-delete', payload)
                    .then((res) => {
                        this.requests = res.data?.sendedRequests ?? [];
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

        editFriendRequest(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/friend-request-edit', payload)
                    .then((res) => {
                        this.requests = res.data?.sendedRequests ?? [];
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
    },
});