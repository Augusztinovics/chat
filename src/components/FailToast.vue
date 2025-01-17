<template>
    <div class="toaster danger">
        <h5><span>&#10005;</span>{{ message }}</h5>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';

    export default {
        props: ['msg'],
        computed: {
            ...mapState(useLgStore, ['lg']),
            message() {
                return this.msg ?? this.lg('general_error');
            },
        },
    }
</script>
