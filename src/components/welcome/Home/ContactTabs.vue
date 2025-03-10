<template>
    <div class="contact-tabs">
        <div class="tab">
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'SEARCH'}" @click="selectTab('SEARCH')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconSearch /></span>
                <span class="tab-text">{{ lg('contact_search') }}</span>
            </span>
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'GET'}" @click="selectTab('GET')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconLeft /></span>
                <span class="tab-text">{{ lg('friend_requests') }}</span>
                <sup class="tab-num" v-if="numGetRequests">{{ numGetRequests }}</sup>
            </span>
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'SEND'}" @click="selectTab('SEND')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconRight /></span>
                <span class="tab-text">{{ lg('send_requests') }}</span>
                <sup class="tab-num" v-if="numSendRequests">{{ numSendRequests }}</sup>
            </span>
        </div>
        <div v-if="selectedTab != 'NONE'" class="tab-content">
            <div v-if="selectedTab == 'SEARCH'"><SearchContactTab @reloadData="loadStores"/></div>
            <div v-if="selectedTab == 'GET'"><GetRequestsTab @changeTab="selectTab('SEARCH')" @reloadData="loadStores"/></div>
            <div v-if="selectedTab == 'SEND'"><SendRequestsTab @changeTab="selectTab('SEARCH')" @reloadData="loadStores"/></div>
        </div>
        <SuccessToast v-if="saveSuccess" :msg="toastMessage"/>
        <FailToast v-if="saveError":msg="toastMessage"/>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/IconUser.vue';
    import IconSearch from '@/components/icons/IconSearch.vue';
    import IconLeft from '@/components/icons/IconLeft.vue';
    import IconRight from '@/components/icons/IconRight.vue';
    import { mapStores, mapState, mapActions } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { requestSendStore } from '@/stores/request_send';
    import { requestGetStore } from '@/stores/request_get';
    import { loadingStore } from '@/stores/loadin';
    import SearchContactTab from './SearchContactTab.vue';
    import SendRequestsTab from './SendRequestsTab.vue';
    import GetRequestsTab from './GetRequestsTab.vue';
    import SuccessToast from '@/components/SuccessToast.vue';
    import FailToast from '@/components/FailToast.vue';

    export default {
        components: {
            IconUser,
            IconSearch,
            IconLeft,
            IconRight,
            SearchContactTab,
            SendRequestsTab,
            GetRequestsTab,
            SuccessToast,
            FailToast,
        },

        data() {
            return {
                selectedTab: 'GET',
                saveSuccess: false,
                saveError: false,
                toastMessage: '',
            }
        },

        computed: {
            ...mapStores(loadingStore),
            ...mapState(useLgStore, ['lg']),
            ...mapState(requestSendStore, {
                numSendRequests:   'numSendRequests',
                isSendStoreLoaded: 'isLoaded'
            }),

            ...mapState(requestGetStore, {
                numGetRequests:   'numGetRequests',
                isGetStoreLoaded: 'isLoaded'
            }),
        },

        methods: {
            ...mapActions(requestSendStore, {
                loadSendRequests: 'loadRequests'
            }),

            ...mapActions(requestGetStore, {
                loadGetRequests: 'loadRequests'
            }),

            selectTab(tab) {
                if (tab == this.selectedTab) {
                    this.selectedTab = 'NONE';
                } else {
                    this.selectedTab = tab;
                }
            },

            loadStores(type='NONE', msg='') {
                let promisies = [];
                if (!this.isSendStoreLoaded) {
                    promisies.push(this.loadSendRequests())
                }
                if (!this.isGetStoreLoaded) {
                    promisies.push(this.loadGetRequests())
                }

                this.loadingStore.startLoading();
                Promise.all(promisies)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        //some loading finish
                        if (this.numGetRequests > 0) {
                            this.selectedTab = 'GET';
                        } else {
                            this.selectedTab = 'NONE';
                        }
                        if (type !== 'NONE') {
                            //There was some action reload, need to show some toaster
                            if (type === 'SUCCESS') {
                                this.toastMessage = msg;
                                this.saveSuccess = true;
                                setTimeout(() => {
                                    this.saveSuccess = false;
                                    this.toastMessage = '';
                                }, 3000);
                            }
                            if (type === 'ERROR') {
                                this.toastMessage = msg;
                                this.saveError = true;
                                setTimeout(() => {
                                    this.saveError = false;
                                    this.toastMessage = '';
                                }, 3000);
                            }
                        }
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.toastMessage = this.lg('general_error');
                            this.saveError = true;
                            setTimeout(() => {
                                this.saveError = false;
                                this.toastMessage = '';
                            }, 3000);
                        }
                    });
            },
        },

        mounted() {
            this.loadStores();
        },

    }
</script>