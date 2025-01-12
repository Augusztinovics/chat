<template>
    <BaseLayout>
        <div class="card">
            <TermsSr v-if="activeLg == 'SR'" />
            <TermsEn v-else-if="activeLg == 'EN'" />
            <TermsHu v-else />
        </div>
    </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/welcome/BaseLayout.vue';
import TermsHu from '@/components/terms/TermsHu.vue';
import TermsSr from '@/components/terms/TermsSr.vue';
import TermsEn from '@/components/terms/TermsEn.vue';
import { mapState } from 'pinia';
import { useLgStore } from '@/stores/active__lg';

export default {
    components: {
        BaseLayout,
        TermsHu,
        TermsSr,
        TermsEn,
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