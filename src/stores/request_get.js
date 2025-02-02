import { defineStore } from 'pinia';
import axios from 'axios';

export const requestGetStore = defineStore('requestGet', {
    state: () => ({
        requests: [],
    }),

    actions: {
        loadRequests() {
            return new Promise((resolve,reject) => {

            });
        },

        acceptRequest(payload) {
            return new Promise((resolve,reject) => {
                console.log(payload);
                setTimeout(() => {
                    resolve(true)
                }, 1000);
            });
        },
    },
});