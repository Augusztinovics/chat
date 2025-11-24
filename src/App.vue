<template>
    <RouterView />
</template>

<script>
    import { RouterView } from 'vue-router'
    import { mapStores } from 'pinia';
    import { socketStore } from '@/stores/socket';
    const socket = io();

    export default {
        computed: {
            ...mapStores(socketStore),
        },

        mounted() {
            this.socketStore.socket = socket;
        }
    }
</script>
