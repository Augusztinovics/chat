<template>
    <div>
        <div class="search-menu">
            <div class="user-search-input">
                <label for="search_input">{{ lg('user_search') }}</label>
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting">
                    <button type="button" @click="searchUsers" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div v-if="hasSearchResult" class="search-result-holder">
                <p><span>{{ searchResult.length }}</span> <span>{{ lg('results') }}</span></p>
                <FriendCard v-for="friend in searchResult" :key="'friend_' + friend.friendId"  :friend="friend"/>
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
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),
            hasSearchResult() {
                return this.searchResult.length > 0;
            },
        },

        methods: {
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
        },

        mounted() {
            this.submitting = false;
            this.searchText = '';
            this.firstSearch = true;
            document.getElementById('search_input').focus();
        },
    }
</script>