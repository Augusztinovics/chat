<template>
    <div>
        <div>
            <!-- tabs -->

        </div>
        <div>
            <!-- selections -->
             <button v-for="smile in smiles" :key="smile.dec">{{ smile.emoji }}</button>

        </div>
    </div>
</template>

<script>
import { SMILES } from './EmojiSets.js';
export default {
    props: ['from'],

    data() {
        return {
            activeTab: 0,
        };
    },

    computed : {
        smiles() {
            return SMILES;
        }
    },
    methods: {
        emojiSelect(emoji) {
            this.$emit('selected', emoji);
        },
    },
}
</script>