<template>
    <div>
        <div v-if="numGetRequests" class="search-result-holder">
            <div class="results">
                <div v-if="hasPagination">
                    <button type="button" :disabled="paginationIndex == 0" class="pag-btn" @click="paginateLeft"><</button>
                </div>
                <div class="result-cards">
                    <FriendCard v-for="friend in cardsToShow" :key="'send__request_' + friend.friendId"  :friend="friend" @reloadData="reloadData"/>
                </div>
                <div v-if="hasPagination">
                    <button type="button" :disabled="rightPaginationDisabled"class="pag-btn" @click="paginateRight">></button>
                </div>
            </div>
        </div>
        <div v-else class="text-center m-2">
            <p>{{ lg('not_send_any_request_yet') }} <span class="btn-link" @click="changeTabToSearch">{{ lg('contact_search') }}</span></p>
        </div>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { paginationSizesStore } from '@/stores/pagination_sizes';
    import { requestGetStore } from '@/stores/request_get';
    import FriendCard from './FriendCard.vue';

    export default {
        components: {
            FriendCard,
        },

        data() {
            return {
                paginationIndex: 0,
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),

            ...mapState(requestGetStore, ['numGetRequests', 'getRequests']),

            ...mapStores(paginationSizesStore),

            hasPagination() {
                return this.numGetRequests > this.paginationSizesStore.topSize;
            },

            rightPaginationDisabled() {
                return (this.paginationIndex * this.paginationSizesStore.topSize) + this.paginationSizesStore.topSize >= this.numGetRequests;
            },

            cardsToShow() {
                let cards = [];
                if (this.numGetRequests < 1) return cards;
                let startIndex = this.paginationIndex * this.paginationSizesStore.topSize;
                if (startIndex > this.getRequests.length - 1) {
                    startIndex = this.getRequests.length - 1;
                }
                if (this.paginationSizesStore.topSize >= this.getRequests.length) {
                    startIndex = 0;
                }
                let endIndex = startIndex + this.paginationSizesStore.topSize;
                if (endIndex > this.getRequests.length) {
                    endIndex = this.getRequests.length;
                }

                for (let index = startIndex; index < endIndex; index++) {
                    cards.push(this.getRequests[index]);
                }
                return cards;
            },
        },

        methods: {
            paginateLeft() {
                this.paginationIndex--;
            },

            paginateRight() {
                this.paginationIndex++;
            },

            changeTabToSearch() {
                this.$emit('changeTab');
            },

            reloadData(type, msg) {
                this.$emit('reloadData', type, msg);
            }
        },
    }
</script>