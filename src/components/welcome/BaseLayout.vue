<template>
    <div class="base-layout-body">
        <div class="top-nav">
            <nav>
                <div class="nav-box">
                    <RouterLink to="/home/terms" class="menu-item"><span class="icon"><IconTerms /></span><span class="hide-mb ml-05 text-bold">{{ lg('terms') }}</span></RouterLink>
                    <RouterLink to="/home/privacy" class="menu-item"><span class="icon"><IconShield /></span><span class="hide-mb ml-05 text-bold">{{ lg('privacy') }}</span></RouterLink>
                </div>
                <div class="nav-box">
                    <RouterLink to="/home" class="menu-item"><span class="icon"><IconHome /></span><span class="hide-mb ml-05 text-bold">{{ lg('home') }}</span></RouterLink>
                    <RouterLink to="/home/profile" class="menu-item"><span class="icon"><IconIdCard /></span><span class="hide-mb ml-05 text-bold">{{ lg('profile') }}</span></RouterLink>
                </div>
                <div class="nav-box">
                    <LgSelector class="menu-item" />
                    <a href="/logout" class="menu-item" ><span class="icon"><ExitIcon /></span><span class="hide-mb ml-05 text-bold">{{ lg('logout') }}</span></a>
                </div>
            </nav>
        </div>
        <div class="side-body">
            <div class="side-nav">
                <ChatNav />
            </div>
            <div class="content"><slot></slot></div>
        </div>
        <LoadingOverlay v-if="loadingStore.showLoading" />
    </div>
</template>

<script>
import { mapStores, mapState } from 'pinia';
import { userStore } from '@/stores/user';
import { useLgStore } from '@/stores/active__lg';
import { paginationSizesStore } from '@/stores/pagination_sizes';
import { loadingStore } from '@/stores/loadin';
import { socketStore } from '@/stores/socket';
import { RouterLink } from 'vue-router';
import IconIdCard from '@/components/icons/IconIdCard.vue';
import IconTerms from '@/components/icons/IconTerms.vue';
import IconShield from '@/components/icons/IconShield.vue';
import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
import LgSelector from '@/components/LgSelector.vue';
import IconHome from '@/components/icons/IconHome.vue';
import ExitIcon from '@/components/icons/ExitIcon.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';
import ChatNav from '@/components/welcome/Chat/ChatNav.vue';
import { friendsStore } from '@/stores/friends';

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
        LoadingOverlay,
        ChatNav,
    },

    data() {
        return {
            loadingError: false,
        }
    },

    computed: {
        ...mapStores(userStore, paginationSizesStore, loadingStore, socketStore, friendsStore),
        ...mapState(useLgStore, ['lg']),
    },

    methods: {
        loadData() {
            let promisies = [];

            if (!this.userStore.loaded) {
                promisies.push(this.userStore.load());
            }
            if (!this.friendsStore.loaded) {
                promisies.push(this.friendsStore.loadFriends());
            }

            if (promisies.length < 1) return;
            this.loadingStore.startLoading();
            this.loadingError = false;
            Promise.all(promisies)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        if (this.socketStore.socket) {
                            this.socketStore.socket.emit('identify', {user_id: this.userStore.id});
                        }
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.loadingError = true;
                        }
                    })
        },

    },

    mounted() {
        this.loadData();
        this.paginationSizesStore.calculatePaginationStep();
        window.addEventListener('resize', this.paginationSizesStore.calculatePaginationStep);
        this.socketStore.socket.on('user_join', e => {
            this.friendsStore.addToActiveFriends(parseInt(e));
        });
        this.socketStore.socket.on('user_left', e => {
            this.friendsStore.removeFromActiveFriens(parseInt(e));
        });
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.paginationSizesStore.calculatePaginationStep);
    },
}
</script>