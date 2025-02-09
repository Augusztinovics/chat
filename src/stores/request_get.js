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
    },

    actions: {
        loadRequests() {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    this.loaded = true;
                    resolve(true)
                }, 300);
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