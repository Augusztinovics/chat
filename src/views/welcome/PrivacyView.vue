<template>
    <div class="welcome-wrapper">

        <header class="welcome-register">
            <div class="menu-box">
                <RouterLink to="/terms" class="mr-2 menu-item"><span class="icon"><IconTerms /></span> {{ lg('terms') }}</RouterLink>
                <RouterLink to="/" class="menu-item"><span class="icon"><IconUser /></span> {{ lg('login') }}</RouterLink>
            </div>
            <div class="menu-box">
                <RouterLink to="/register" class="menu-item mr-2"><span class="icon"><IconIdCard /></span> {{ lg('register') }}</RouterLink>
                <LgSelector class="menu-item" />
            </div>
        </header>

        <h1 class="text-center m-2">{{ lg('privacy') }}</h1>

        <main>
            <div class="card">
                <PrivacySr v-if="activeLg == 'SR'" />
                <PrivacyEn v-else-if="activeLg == 'EN'" />
                <PrivacyHu v-else />
            </div>
        </main>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import IconUser from '@/components/icons/IconUser.vue';
import IconIdCard from '@/components/icons/IconIdCard.vue';
import IconTerms from '@/components/icons/IconTerms.vue';
import LgSelector from '@/components/LgSelector.vue';
import PrivacyHu from '@/components/privacy/PrivacyHu.vue';
import PrivacySr from '@/components/privacy/PrivacySr.vue';
import PrivacyEn from '@/components/privacy/PrivacyEn.vue';
import { mapState } from 'pinia';
import { useLgStore } from '@/stores/active__lg';

export default {
    components: {
        RouterLink,
        IconUser,
        IconIdCard,
        IconTerms,
        LgSelector,
        PrivacyHu,
        PrivacySr,
        PrivacyEn,
    },

    computed: {
        ...mapState(useLgStore, ['lg', 'lgCode']),

        activeLg() {
            return this.lgCode ?? 'HU';
        },
    },
}
</script>
