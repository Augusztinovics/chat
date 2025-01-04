import { defineStore } from 'pinia';

export const registerStore = defineStore('register', {
    state: () => ({
        username: '',
        password: '',
        acceptTerms: false,
    }),
});