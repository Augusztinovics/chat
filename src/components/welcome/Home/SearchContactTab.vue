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
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            searchUsers() {},
        },

        mounted() {
            this.submitting = false;
            this.searchText = '';
            document.getElementById('search_input').focus();
        },
    }
</script>