<template>
    <div>
        <div class="search-menu">
            <div class="user-search-input">
                <label for="search_input">{{ lg('user_search') }}</label>
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="searchUsers">
                    <button type="button" @click="searchUsers" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div v-if="hasSearchResult" class="search-result-holder">
                <p><span>{{ searchResult.length }}</span> <span>{{ lg('results') }}</span></p>
                <div class="results">
                    <div v-if="hasPagination">
                        <button type="button" :disabled="paginationIndex == 0" class="pag-btn" @click="paginateLeft"><</button>
                    </div>
                    <div class="result-cards">
                        <FriendCard v-for="friend in cardsToShow" :key="'friend_' + friend.friendId"  :friend="friend"/>
                    </div>
                    <div v-if="hasPagination">
                        <button type="button" :disabled="rightPaginationDisabled"class="pag-btn" @click="paginateRight">></button>
                    </div>
                </div>
            </div>
            <div v-else class="search-result-no-result-holder">
                <p v-if="firstSearch">{{ lg('user_search_before') }}</p>
                <p v-else>{{ lg('user_search_not_find') }}</p>
            </div>
        </div>
        <FailToast v-if="searchError"/>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { paginationSizesStore } from '@/stores/pagination_sizes';
    import { loadingStore } from '@/stores/loadin';
    import IconSearch from '@/components/icons/IconSearch.vue';
    import axios from 'axios';
    import FailToast from '@/components/FailToast.vue';
    import FriendCard from './FriendCard.vue';

    export default {
        components: {
            IconSearch,
            FailToast,
            FriendCard,
        },

        data() {
            return {
                submitting: false,
                searchText: '',
                firstSearch: true,
                searchResult: [],
                searchError: false,
                paginationIndex: 0,
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),

            ...mapStores(paginationSizesStore, loadingStore),

            hasSearchResult() {
                return this.searchResult.length > 0;
            },

            hasPagination() {
                return this.searchResult.length > this.paginationSizesStore.topSize;
            },

            rightPaginationDisabled() {
                return (this.paginationIndex * this.paginationSizesStore.topSize) + this.paginationSizesStore.topSize >= this.searchResult.length;
            },

            cardsToShow() {
                let cards = [];
                if (!this.hasSearchResult) return cards;
                let startIndex = this.paginationIndex * this.paginationSizesStore.topSize;
                if (startIndex > this.searchResult.length - 1) {
                    startIndex = this.searchResult.length - 1;
                }
                if (this.paginationSizesStore.topSize >= this.searchResult.length) {
                    startIndex = 0;
                }
                let endIndex = startIndex + this.paginationSizesStore.topSize;
                if (endIndex > this.searchResult.length) {
                    endIndex = this.searchResult.length;
                }

                for (let index = startIndex; index < endIndex; index++) {
                    cards.push(this.searchResult[index]);
                }
                return cards;

            },
        },

        methods: {
            searchUsers() {
                if (this.searchText.trim() == '') return;
                this.firstSearch = false;
                this.submitting = true;
                this.loadingStore.startLoading();
                this.searchError = false;
                axios.get('/api/resources/search-user?un=' + this.searchText.trim())
                    .then((res) => {
                        this.submitting = false;
                        this.loadingStore.finishLoading();
                        this.searchResult = res.data.users;
                    })
                    .catch((e) => {
                        this.submitting = false;
                        this.loadingStore.finishLoading();
                        this.searchError = true;
                        setTimeout(() => {
                            this.searchError = false;
                        }, 3000);
                        console.log(e);
                    });
            },

            paginateLeft() {
                this.paginationIndex--;
            },

            paginateRight() {
                this.paginationIndex++;
            },
        },

        mounted() {
            this.submitting = false;
            this.searchText = '';
            this.firstSearch = true;
            document.getElementById('search_input').focus();
        },

    }
</script>