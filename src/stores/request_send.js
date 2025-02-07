import { defineStore } from 'pinia';
import axios from 'axios';

export const requestSendStore = defineStore('requestSend', {
    state: () => ({
        requests: [],
    }),

    actions: {
        loadRequests() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/sended-friend-requests')
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
    },
});