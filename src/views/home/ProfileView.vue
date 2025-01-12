<template>
    <BaseLayout>Your Profile</BaseLayout>
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