<template>
    <div class="base-layout-body">
        <div class="top-nav">
            <nav>
                <div class="nav-box">
                    <RouterLink to="/home/terms" class="mr-2 menu-item"><span class="icon"><IconTerms /></span><span class="hide-mb ml-05 text-bold">{{ lg('terms') }}</span></RouterLink>
                    <RouterLink to="/home/privacy" class="mr-2 menu-item"><span class="icon"><IconShield /></span><span class="hide-mb ml-05 text-bold">{{ lg('privacy') }}</span></RouterLink>
                </div>
                <div class="nav-box">
                    <RouterLink to="/home" class="menu-item mr-2"><span class="icon"><IconHome /></span><span class="hide-mb ml-05 text-bold">{{ lg('home') }}</span></RouterLink>
                    <RouterLink to="/home/profile" class="menu-item mr-2"><span class="icon"><IconIdCard /></span><span class="hide-mb ml-05 text-bold">{{ lg('profile') }}</span></RouterLink>
                </div>
                <div class="nav-box">
                    <LgSelector class="menu-item" />
                    <a href="/logout" class="menu-item ml-2" ><span class="icon"><ExitIcon /></span><span class="hide-mb ml-05 text-bold">{{ lg('logout') }}</span></a>
                </div>
            </nav>
        </div>
        <div class="side-nav">
            <div class="side-nav-box">
                <p>Side</p>
                <p>Side</p>
                <p>Side</p>
                <p>Side</p>
                <p>Side</p>
                <p>Side</p>
                <p>Side</p>
                <p>Side</p>
            </div>
        </div>
        <div class="content"><slot></slot></div>
    </div>
</template>

<script>
import { mapStores, mapState } from 'pinia';
import { userStore } from '@/stores/user';
import { useLgStore } from '@/stores/active__lg';
import { RouterLink } from 'vue-router';
import IconIdCard from '@/components/icons/IconIdCard.vue';
import IconTerms from '@/components/icons/IconTerms.vue';
import IconShield from '@/components/icons/IconShield.vue';
import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
import LgSelector from '@/components/LgSelector.vue';
import IconHome from '@/components/icons/IconHome.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';

export default {
    components: {
        RouterLink,
        IconIdCard,
        IconTerms,
        IconShield,
        IconEyeOpen,
        LgSelector,
        IconHome,
        ExitIcon,
    },

    data() {
        return {
            loading: false,
            loadingError: false,
        }
    },

    computed: {
        ...mapStores(userStore),
        ...mapState(useLgStore, ['lg']),
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
        },

    },

    mounted() {
        this.loadUser();
    }
}
</script>