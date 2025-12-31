<template>
    <div class="side-nav-box">
        <div class="side-nav-items">
            <div v-for="card in groupCards" :key="'title_' + card.groupId" @click="toogleBox(card.groupId)" class="group-item">
                <sup class="new-msg" :class="{'active' : hasNewMessage(card.groupId)}">&#11044;</sup>
                <ContactImage :friends="card.groupUsers"/>
                <p>{{ defaultGroupName(card) }}</p>
            </div>
        </div>
        <ChatBox v-for="card in groupCards" :card="card" :key="'box_' + card.groupId" />
        <InfoToast v-for="toast in getToasts" :key="'info_' + toast.toast_id" :msg="toast"/>
    </div>
</template>

<script>
    import ChatBox from '@/components/welcome/Chat/ChatBox.vue';
    import { mapStores, mapState, mapActions } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import ContactImage from '@/components/welcome/Home/ContactImage.vue';
    import { socketStore } from '@/stores/socket';
    import { toastsStore } from '@/stores/toasts';
    import { useLgStore } from '@/stores/active__lg';
    import InfoToast from '@/components/InfoToast.vue';

    export default {
        components: {
            ChatBox,
            ContactImage,
            InfoToast,
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
                isChatBoxOpen: 'isBoxOpen',
                defaultGroupName: 'defaultGroupName',
            }),
            ...mapState(toastsStore, ['toastCount', 'getToasts']),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            ...mapActions(friendsStore, ['toogleChatbox', 'addMessageToGroup']),
            ...mapActions(toastsStore, ['addToast', 'removeToast', 'handleUpdateEvent']),

            toogleBox(groupId) {
                if (this.audioClick) {
                    this.audioClick.currentTime = 0;
                    this.audioClick.play().catch(e => {console.log(e)});
                }
                this.toogleChatbox(groupId);
            },
        },

         mounted() {
            if (!this.audio) {
                this.audio = new Audio('sounds/new-notification.mp3');
            }
            if (!this.audioClick) {
                this.audioClick = new Audio('sounds/click.mp3');
            }
            this.socketStore.socket.on('group_message', e => {
                if (this.audio) {
                    this.audio.currentTime = 0; 
                    this.audio.play().catch(error => {
                        console.error("Audio play failed:", error);
                    });
                }
                this.addMessageToGroup(e);
                if (e.group_id && !this.isChatBoxOpen(e.group_id)) {
                    let toastId = this.toastCount + 1;
                    let newToast = {
                        toast_id: toastId,
                        sender: e.sender ?? '',
                        msg: this.lg('new_msg'),
                        group_id: e.group_id,
                    };
                    this.addToast(newToast);
                    setTimeout(() => {
                        this.removeToast(toastId)
                    }, 5000);
                }
            });

            this.socketStore.socket.on('user_update', update => {
                this.handleUpdateEvent(update);
            });
        },
    }
</script>