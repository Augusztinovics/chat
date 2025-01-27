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
                        <button type="button" :disabled="paginationIndex == 0" class="pag-btn"><</button>
                    </div>
                    <div class="result-cards">
                        <FriendCard v-for="friend in cardsToShow" :key="'friend_' + friend.friendId"  :friend="friend"/>
                    </div>
                    <div v-if="hasPagination">
                        <button type="button" :disabled="rightPaginationDisabled"class="pag-btn">></button>
                    </div>
                </div>
            </div>
            <div v-else class="search-result-no-result-holder">
                <p v-if="firstSearch">{{ lg('user_search_before') }}</p>
                <p v-else>{{ lg('user_search_not_find') }}</p>
            </div>
        </div>
        <LoadingOverlay v-if="submitting"/>
        <FailToast v-if="searchError"/>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import IconSearch from '@/components/icons/IconSearch.vue';
    import LoadingOverlay from '@/components/LoadingOverlay.vue';
    import axios from 'axios';
    import FailToast from '@/components/FailToast.vue';
    import FriendCard from './FriendCard.vue';

    export default {
        components: {
            IconSearch,
            LoadingOverlay,
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
                paginationStep: 5,
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),

            hasSearchResult() {
                return this.searchResult.length > 0;
            },

            hasPagination() {
                return this.searchResult.length > this.paginationStep;
            },

            rightPaginationDisabled() {
                return this.paginationIndex * this.paginationStep >= this.searchResult.length;
            },

            // paginationStep() {
            //     if (window.innerWidth > 1600) return 5;
            //     if (window.innerWidth > 1160) return 4;
            //     if (window.innerWidth > 900) return 3;
            //     if (window.innerWidth > 749) return 2;
            //     if (window.innerWidth > 665) return 3;
            //     if (window.innerWidth > 500) return 2;
            //     return 1;
            // },

            cardsToShow() {
                let cards = [];
                if (!this.hasSearchResult) return cards;
                let startIndex = this.paginationIndex * this.paginationStep;
                if (startIndex > this.searchResult.length - 1) {
                    startIndex = this.searchResult.length - 1;
                }
                let endIndex = startIndex + this.paginationStep;
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
            calculatePaginationStep() {
                if (window.innerWidth > 1600) {
                    this.paginationStep = 5;
                    return;
                }
                if (window.innerWidth > 1160) {
                    this.paginationStep = 4;
                    return;
                }
                if (window.innerWidth > 900) {
                    this.paginationStep = 3;
                    return;
                }
                if (window.innerWidth > 749) {
                    this.paginationStep = 2;
                    return;
                }
                if (window.innerWidth > 665) {
                    this.paginationStep = 3;
                    return;
                }
                if (window.innerWidth > 500) {
                    this.paginationStep = 2;
                    return;
                }
                this.paginationStep = 1;
            },
            searchUsers() {
                if (this.searchText.trim() == '') return;
                this.firstSearch = false;
                this.submitting = true;
                this.searchError = false;
                axios.get('/api/resources/search-user?un=' + this.searchText.trim())
                    .then((res) => {
                        this.submitting = false;
                        this.searchResult = res.data.users;
                    })
                    .catch((e) => {
                        this.submitting = false;
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
            window.addEventListener('resize', this.calculatePaginationStep);
            this.calculatePaginationStep();
        },

        beforeUnmount() {
            window.removeEventListener('resize', this.calculatePaginationStep);
        },
    }
</script>