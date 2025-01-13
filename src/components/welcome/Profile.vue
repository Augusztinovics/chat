<template>
    <div>
        <h1 class="text-center">{{ lg('profile') }}</h1>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { userStore } from '@/stores/user';
    import { useLgStore } from '@/stores/active__lg';
    export default {
        computed: {
            ...mapStores(userStore),
            ...mapState(useLgStore, ['lg']),
        },
    }
</script>