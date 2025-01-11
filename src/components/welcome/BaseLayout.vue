<template>
    <div>
        <h1>Base Layout</h1>
        <slot></slot>
    </div>
</template>

<script>
import { mapStores } from 'pinia';
import { userStore } from '@/stores/user';

export default {
    data() {
        return {
            loading: false,
            loadingError: false,
        }
    },

    computed: {
        ...mapStores(userStore),
    },

    methods: {
        loadUser() {
            if (this.userStore.loaded) return;
            this.loading = true;
            this.loadingError = false;
            this.userStore.load()
                    .then(() => {
                        this.loading = false;
                    })
                    .catch((e) => {
                        this.loading = false;
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.loadingError = true;
                        }
                    })
        }
    },

    mounted() {
        this.loadUser();
    }
}
</script>