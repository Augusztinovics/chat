<template>
    <div class="emoji-container">
        <div class="emoji-select-box">
            <div>
                <input type="text" v-model="searchText" name="icon-serch-field">
                <span class="icon"><IconSearch /></span>
            </div>
            <select name="group_select" id="group_select" v-model="activeGroup">
                <option v-for="group in selectableGroups" :key="group.id" :value="group.id">{{ group.label }}</option>
            </select>
        </div>
        <div class="emoji-box">
            <button type="button" v-for="emoji in selectedGroup" :title="emoji.name" :key="emoji.dec" @click="emojiSelect(emoji)">{{ emoji.emoji }}</button>
        </div>
    </div>
</template>

<script>
import { GROUPS, selectByCategory, searchEmojis } from './EmojiFunctions.js';
import IconSearch from '@/components/icons/IconSearch.vue';

export default {
    components: {
        IconSearch,
    },
    props: ['from'],

    data() {
        return {
            activeGroup: 'SMILES',
            searchText: '',
        };
    },

    computed : {
        selectableGroups() {
            return GROUPS;
        },
        selectedGroup() {
            if (this.searchText.length > 0) {
                return searchEmojis(this.searchText);
            } else if (this.activeGroup == 'RECENT') {
                // return recent from local store depending from prop
                return [];
            } else {
                return selectByCategory(this.activeGroup);
            }
        },
    },
    methods: {
        emojiSelect(emoji) {
            this.$emit('selected', emoji);
        },
    },
}
</script>