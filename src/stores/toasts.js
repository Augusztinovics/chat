import { defineStore } from 'pinia';
import { userStore } from './user';

export const toastsStore = defineStore('toasts', {
    state: () => ({
        EVENT_REQUST_SEND: 'EVENT_REQUST_SEND',
        EVENT_REQUST_ACCEPT: 'EVENT_REQUST_ACCEPT',
        EVENT_REQUST_DENIE: 'EVENT_REQUST_DENIE',
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

        handleUpdateEvent(payload) {
            //Validate event
            if (!payload) return;
            if (!payload.event_type) return;
            if (!payload.target_ids) return;
            if (!Array.isArray(payload.target_ids)) return;
            if (payload.target_ids.length < 1) return;
            const currentUser = userStore();
            if (!payload.target_ids.includes(currentUser.id)) return;

            let toastId = this.toasts.length + 1;
            let infoEvent = {
                toast_id: toastId,
                sender: payload.sender ?? '',
                msg: payload.msg ?? '',
                group_id: payload.group_id ?? null,
            };

            //TODO Reload neccesary stores, depending of event_type!!

            this.addToast(infoEvent);
            setTimeout(() => {
                this.removeToast(toastId);
            }, 5000);
        },
    },
});