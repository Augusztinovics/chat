<template>
    <div>
        <div>
            Will be menu: User Questions, Resources, Actions, Matrics, Log
        </div>
        <div><slot></slot></div>
        <LoadingOverlay v-if="loadingStore.showLoading" />
    </div>
</template>

<script>
    import { mapStores } from 'pinia';
    import { adminUserStore } from '@/stores/admin_user';
    import { loadingStore } from '@/stores/loadin';
    import LoadingOverlay from '@/components/LoadingOverlay.vue';

    export default {
        components: {
            LoadingOverlay,
        },
        computed: {
            ...mapStores(adminUserStore, loadingStore),
        },

        methods: {
            loadAdmin() {
                if (!this.adminUserStore.loaded) {
                    this.loadingStore.startLoading();
                    this.adminUserStore.load()
                        .then(() => {
                            this.loadingStore.finishLoading();
                            if (!this.adminUserStore.hasUpdatePassword) {
                                this.$router.push('/admin/admin-password');
                            }
                        })
                        .catch((e) => {
                            this.loadingStore.finishLoading();
                            if (e == 401) {
                                this.$router.push('/login');
                            } else {
                                window.alert(e);
                            }
                        });
                }
            },
        },

        mounted() {
            if (!this.adminUserStore.confirmed) {
                this.$router.push('/admin/admin-confirm');
                return;
            }
            this.loadAdmin();
        },
    }
</script>