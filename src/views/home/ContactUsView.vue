<template>
    <BaseLayout>
        <ContactUs />
    </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/welcome/BaseLayout.vue';
import ContactUs from '@/components/welcome/Home/ContactUs.vue';

export default {
    components: {
        BaseLayout,
        ContactUs,
    },
}
</script>