<template>
    <div class="toaster success">
        <h5><span>&check;</span>{{ message }}</h5>
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
                return this.msg ?? this.lg('saved');
            },
        },
    }
</script>
