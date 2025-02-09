<template>
    <div>
        <div v-if="numSendRequests" class="search-result-holder">
            <div class="results">
                <div v-if="hasPagination">
                    <button type="button" :disabled="paginationIndex == 0" class="pag-btn" @click="paginateLeft"><</button>
                </div>
                <div class="result-cards">
                    <FriendCard v-for="friend in cardsToShow" :key="'send__request_' + friend.friendId"  :friend="friend"/>
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
    import { requestSendStore } from '@/stores/request_send';
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

            ...mapState(requestSendStore, ['numSendRequests', 'sendRequests']),

            ...mapStores(paginationSizesStore),

            hasPagination() {
                return this.numSendRequests > this.paginationSizesStore.topSize;
            },

            rightPaginationDisabled() {
                return (this.paginationIndex * this.paginationSizesStore.topSize) + this.paginationSizesStore.topSize >= this.numSendRequests;
            },

            cardsToShow() {
                let cards = [];
                if (this.numSendRequests < 1) return cards;
                let startIndex = this.paginationIndex * this.paginationSizesStore.topSize;
                if (startIndex > this.sendRequests.length - 1) {
                    startIndex = this.sendRequests.length - 1;
                }
                if (this.paginationSizesStore.topSize >= this.sendRequests.length) {
                    startIndex = 0;
                }
                let endIndex = startIndex + this.paginationSizesStore.topSize;
                if (endIndex > this.sendRequests.length) {
                    endIndex = this.sendRequests.length;
                }

                for (let index = startIndex; index < endIndex; index++) {
                    cards.push(this.sendRequests[index]);
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
        },
    }
</script>