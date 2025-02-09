import { defineStore } from 'pinia';

export const loadingStore = defineStore('loading', {
    state: () => ({
        counter: 0,
        showLoading: false,
    }),

    actions: {
        startLoading() {
            this.counter++;
            if (!this.showLoading) {
                this.showLoading = true;
            }
        },

        finishLoading() {
            this.counter--;
            if (this.counter < 1) {
                this.showLoading = false;
            }
        },
    },
});