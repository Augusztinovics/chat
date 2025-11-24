import { defineStore } from 'pinia';

export const socketStore = defineStore('socket', {
    state: () => ({
        socket: null,
    }),
});