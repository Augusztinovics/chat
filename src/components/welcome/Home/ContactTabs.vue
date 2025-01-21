<template>
    <div class="contact-tabs">
        <div class="tab">
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'SOME'}" @click="selectTab('SOME')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconEarth /></span>
                <span class="tab-text">{{ lg('who_can_know') }}</span>
            </span>
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'SEARCH'}" @click="selectTab('SEARCH')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconSearch /></span>
                <span class="tab-text">{{ lg('contact_search') }}</span>
            </span>
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'GET'}" @click="selectTab('GET')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconLeft /></span>
                <span class="tab-text">{{ lg('friend_requests') }}</span>
            </span>
            <span class="tab-menu" :class="{'active-tab': selectedTab == 'SEND'}" @click="selectTab('SEND')">
                <span class="icon"><IconUser /></span>
                <span class="icon"><IconRight /></span>
                <span class="tab-text">{{ lg('send_requests') }}</span>
            </span>
        </div>
        <div v-if="selectedTab != 'NONE'" class="tab-content">
            <div v-if="selectedTab == 'SOME'">Ajanlas</div>
            <div v-if="selectedTab == 'SEARCH'">Keresgeles</div>
            <div v-if="selectedTab == 'GET'">Kapottak</div>
            <div v-if="selectedTab == 'SEND'">Elkuldtem, de hun a valasz</div>
        </div>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/IconUser.vue';
    import IconEarth from '@/components/icons/IconEarth.vue';
    import IconSearch from '@/components/icons/IconSearch.vue';
    import IconLeft from '@/components/icons/IconLeft.vue';
    import IconRight from '@/components/icons/IconRight.vue';
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';

    export default {
        components: {
            IconUser,
            IconEarth,
            IconSearch,
            IconLeft,
            IconRight,
        },

        data() {
            return {
                selectedTab: 'SOME',
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            selectTab(tab) {
                if (tab == this.selectedTab) {
                    this.selectedTab = 'NONE';
                } else {
                    this.selectedTab = tab;
                }
            }
        },

    }
</script>