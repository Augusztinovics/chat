<template>
    <BaseLayout>
        <div class="card">
            <PrivacySr v-if="activeLg == 'SR'" />
            <PrivacyEn v-else-if="activeLg == 'EN'" />
            <PrivacyHu v-else />
        </div>
    </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/welcome/BaseLayout.vue';
import PrivacyHu from '@/components/privacy/PrivacyHu.vue';
import PrivacySr from '@/components/privacy/PrivacySr.vue';
import PrivacyEn from '@/components/privacy/PrivacyEn.vue';
import { mapState } from 'pinia';
import { useLgStore } from '@/stores/active__lg';

export default {
    components: {
        BaseLayout,
        PrivacyHu,
        PrivacySr,
        PrivacyEn,
    },
    props: ['socket'],

    computed: {
        ...mapState(useLgStore, ['lg', 'lgCode']),

        activeLg() {
            return this.lgCode ?? 'HU';
        },
    },
}
</script>