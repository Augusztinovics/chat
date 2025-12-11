<template>
    <div class="side-nav-box">
        <div class="side-nav-items">
            <div v-for="card in groupCards" :key="'title_' + card.groupId" @click="toogleChatbox(card.groupId)" class="group-item">
                <sup class="active">&#11044;</sup>
                <ContactImage :friends="card.groupUsers"/>
                <p>{{ card.groupName }}</p>
            </div>
        </div>
        <ChatBox v-for="card in groupCards" :card="card" :key="'box_' + card.groupId" />
    </div>
</template>

<script>
    import ChatBox from '@/components/welcome/Chat/ChatBox.vue';
    import { mapState, mapActions } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import ContactImage from '@/components/welcome/Home/ContactImage.vue';

    export default {
        components: {
            ChatBox,
            ContactImage,
        },

        computed: {
            ...mapState(friendsStore, {
                groupCards: 'getGroupsData',
            }),
        },

        methods: {
            ...mapActions(friendsStore, ['toogleChatbox']),
        },
    }
</script>