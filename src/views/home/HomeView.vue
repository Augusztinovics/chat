<template>
    <BaseLayout>You Are Home</BaseLayout>
</template>

<script>
import BaseLayout from '@/components/welcome/BaseLayout.vue';
export default {
    components: {
        BaseLayout
    },
    props: ['socket'],
}
</script>