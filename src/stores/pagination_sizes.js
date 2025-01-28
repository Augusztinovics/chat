import { defineStore } from 'pinia';

export const paginationSizesStore = defineStore('paginationSizes', {
    state: () => ({
        topSize: 5,
    }),

    actions: {
        calculatePaginationStep() {
            if (window.innerWidth > 1600) {
                this.topSize = 5;
                return;
            }
            if (window.innerWidth > 1160) {
                this.topSize = 4;
                return;
            }
            if (window.innerWidth > 900) {
                this.topSize = 3;
                return;
            }
            if (window.innerWidth > 749) {
                this.topSize = 2;
                return;
            }
            if (window.innerWidth > 665) {
                this.topSize = 3;
                return;
            }
            if (window.innerWidth > 500) {
                this.topSize = 2;
                return;
            }
            this.topSize = 1;
        },
    },
});
