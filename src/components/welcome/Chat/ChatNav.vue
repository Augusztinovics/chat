<template>
    <div class="side-nav-box">
        <div class="side-nav-items">
            <div v-for="card in groupCards" :key="'title_' + card.groupId" @click="toogleBox(card.groupId)" class="group-item">
                <sup class="new-msg" :class="{'active' : hasNewMessage(card.groupId)}">&#11044;</sup>
                <ContactImage :friends="card.groupUsers"/>
                <p>{{ card.groupName }}</p>
            </div>
        </div>
        <ChatBox v-for="card in groupCards" :card="card" :key="'box_' + card.groupId" />
    </div>
</template>

<script>
    import ChatBox from '@/components/welcome/Chat/ChatBox.vue';
    import { mapStores, mapState, mapActions } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import ContactImage from '@/components/welcome/Home/ContactImage.vue';
    import { socketStore } from '@/stores/socket';

    export default {
        components: {
            ChatBox,
            ContactImage,
        },

        data() {
            return {
                audio: null,
                audioClick: null,
            };
        },

        computed: {
            ...mapStores(socketStore),
            ...mapState(friendsStore, {
                groupCards: 'getGroupsData',
                hasNewMessage: 'hasNewMessage',
            }),
        },

        methods: {
            ...mapActions(friendsStore, ['toogleChatbox', 'addMessageToGroup']),

            toogleBox(groupId) {
                if (this.audioClick) {
                    this.audioClick.currentTime = 0;
                    this.audioClick.play().catch(e => {console.log(e)});
                }
                this.toogleChatbox(groupId);
            },
        },

         mounted() {
            // if (!this.audio) {
            //     this.audio = new Audio('Sounds/newmsg.mp3');
            // }
            // if (!this.audioClick) {
            //     this.audioClick = new Audio('Sounds/click.mp3');
            //     console.log(this.audioClick);
            // }
            this.socketStore.socket.on('group_message', e => {
                if (this.audio) {
                    this.audio.currentTime = 0; 
                    this.audio.play().catch(error => {
                        console.error("Audio play failed:", error);
                    });
                }
                this.addMessageToGroup(e);
            });
        },
    }
</script>