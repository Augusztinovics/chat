import { defineStore } from 'pinia';
import axios from 'axios';

export const requestSendStore = defineStore('requestSend', {
    state: () => ({
        requests: [],
    }),

    actions: {
        loadRequests() {
            return new Promise((resolve,reject) => {});
        },

        sendRequest(payload) {
            return new Promise((resolve,reject) => {
                console.log(payload);
                setTimeout(() => {
                    resolve(true)
                }, 1000);
            });
        },
    },
});