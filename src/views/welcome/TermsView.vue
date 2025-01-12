<template>
    <div class="welcome-wrapper">

        <header class="welcome-register">
            <div class="menu-box">
                <RouterLink to="/privacy" class="menu-item mr-2"><span class="icon"><IconShield /></span> {{ lg('privacy') }}</RouterLink>
                <RouterLink to="/" class="menu-item"><span class="icon"><IconUser /></span> {{ lg('login') }}</RouterLink>
            </div>
            <div class="menu-box">
                <RouterLink to="/register" class="menu-item mr-2"><span class="icon"><IconIdCard /></span> {{ lg('register') }}</RouterLink>
                <LgSelector class="menu-item" />
            </div>
        </header>

        <h1 class="text-center m-2">{{ lg('terms') }}</h1>

        <main>
            <div class="card">
                <TermsSr v-if="activeLg == 'SR'" />
                <TermsEn v-else-if="activeLg == 'EN'" />
                <TermsHu v-else />
            </div>
        </main>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import IconUser from '@/components/icons/IconUser.vue';
import IconIdCard from '@/components/icons/IconIdCard.vue';
import IconShield from '@/components/icons/IconShield.vue';
import LgSelector from '@/components/LgSelector.vue';
import TermsHu from '@/components/terms/TermsHu.vue';
import TermsSr from '@/components/terms/TermsSr.vue';
import TermsEn from '@/components/terms/TermsEn.vue';
import { mapState } from 'pinia';
import { useLgStore } from '@/stores/active__lg';

export default {
    components: {
        RouterLink,
        IconUser,
        IconIdCard,
        IconShield,
        LgSelector,
        TermsHu,
        TermsSr,
        TermsEn,
    },

    computed: {
        ...mapState(useLgStore, ['lg', 'lgCode']),

        activeLg() {
            return this.lgCode ?? 'HU';
        },
    },
}
</script>
