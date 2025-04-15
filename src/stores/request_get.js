import { defineStore } from 'pinia';
import axios from 'axios';

export const requestGetStore = defineStore('requestGet', {
    state: () => ({
        loaded: false,
        requests: [],
    }),

    getters: {
        numGetRequests: (state) => {
            return state.requests.length ?? 0;
        },
        isLoaded: (state) => {
            return state.loaded;
        },
        getRequests: (state) => {
            return state.requests;
        },
    },

    actions: {
        loadRequests() {
            return new Promise((resolve,reject) => {
                axios.get('/api/resources/received-friend-requests')
                    .then((res) => {
                        this.requests = res.data?.receivedRequests ?? [];
                        this.loaded = true;;
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

        acceptRequest(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/friend-request-accept', payload)
                    .then((res) => {
                        this.requests = res.data?.receivedRequests ?? [];
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

        denieRequest(payload) {
            return new Promise((resolve,reject) => {
                axios.post('/api/resources/friend-request-denie', payload)
                    .then((res) => {
                        this.requests = res.data?.receivedRequests ?? [];
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