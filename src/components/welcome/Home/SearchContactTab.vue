<template>
    <div>
        <div>
            <div>
                <label for="search_input">{{ lg('password') }}</label>
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting">
                    <button type="button" @click="searchUsers" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <p v-if="firstSearch">Eloszor</p>
            <div v-else>Has allready</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import IconSearch from '@/components/icons/IconSearch.vue';

    export default {
        components: {
            IconSearch,
        },

        data() {
            return {
                submitting: false,
                searchText: '',
                firstSearch: true,
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            searchUsers() {
                this.firstSearch = false;
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