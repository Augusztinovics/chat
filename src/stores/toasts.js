import { defineStore } from 'pinia';

export const toastsStore = defineStore('toasts', {
    state: () => ({
        toasts: [],
    }),

    getters: {
        toastCount: (state) => {
            return state.toasts.length;
        },

        getToasts: (state) => {
            return state.toasts;
        },
    },

    actions: {
        addToast(toast) {
            if (!toast) return;
            if (!toast.toast_id) return;
            this.toasts.push(toast);
        },

        removeToast(toast_id) {
            let existingIndex = this.toasts.findIndex(t => t.toast_id == toast_id);
            if (existingIndex !== -1) {
                this.toasts.splice(existingIndex, 1);
            }
        },
    },
});