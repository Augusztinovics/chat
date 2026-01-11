<template>
    <div class="admin-layout">
        <div class="admin-nav-holder">
            <nav>
                <div class="center-menu">
                    <RouterLink to="/admin">Quaetions</RouterLink>
                    <RouterLink to="/admin/users">Users</RouterLink>
                    <RouterLink to="/admin/resources">Resources</RouterLink>
                    <RouterLink to="/admin/actions">Actions</RouterLink>
                    <RouterLink to="/admin/metrix">Metrix</RouterLink>
                </div>
                <div class="right-menu">
                    <button type="button" @click="dropOpen=!dropOpen"><span>{{ adminName }}</span><span v-if="dropOpen" class="icon"><IconArrowUp /></span><span v-else class="icon"><IconArrowDown /></span></button>
                    <div v-if="dropOpen" class="admin-drop-menu">
                        <RouterLink to="/admin/admin-password">Change Password</RouterLink>
                    </div>
                </div>
            </nav>
        </div>
        <div class="content"><slot></slot></div>
        <LoadingOverlay v-if="loadingStore.showLoading" />
    </div>
</template>

<script>
    import { mapStores } from 'pinia';
    import { adminUserStore } from '@/stores/admin_user';
    import { loadingStore } from '@/stores/loadin';
    import LoadingOverlay from '@/components/LoadingOverlay.vue';
    import { RouterLink } from 'vue-router';
    import IconArrowUp from '@/components/icons/IconArrowUp.vue';
    import IconArrowDown from '@/components/icons/IconArrowDown.vue';

    export default {
        components: {
            LoadingOverlay,
            RouterLink,
            IconArrowUp,
            IconArrowDown,
        },

        data() {
            return {
                dropOpen: false,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            adminName() {
                return this.adminUserStore.username;
            },
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