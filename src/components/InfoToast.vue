<template>
    <div class="toaster info">
        <p class="text-right"><span @click="removeToast(toastId)">x</span></p>
        <h5>{{ sender }}</h5>
        <p>{{ message }}</p>
        <button v-if="roomId" @click="openChetbox" class="btn btn-primary btn-block">{{ lg('visit_room') }}</button>
    </div>
</template>

<script>
    // TODO
    //Need early close and cloce on action posibility
    //Possibly types:
    //New message on not opened chatbox. Need: sender name, groupe name, short msg or reaction, button to open chatbox
    //New friend request send. Need sender name, short text from friend request message
    //You friend request accepted. Need friend name, some text like: [Name] accepted your request
    //Your friend request denided. Need friend name, some text like: [Name] denided your request
    //Added to group (not for default). Need: sender name, group name, some text like: [Sender] added you to [Group Name], button to open the chatbox
    //Removed to group. Need: sender name, group name, some text like: [Sender] removed from [Group Name]
    //Maybe marketing toast. Need title, img, description and action button (maybe separate toast)

    import { mapState, mapActions } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { toastsStore } from '@/stores/toasts';
    import { friendsStore } from '@/stores/friends';

    export default {
        props: ['msg'],
        computed: {
            ...mapState(useLgStore, ['lg']),
            sender() {
                return this.msg && this.msg.sender ? this.msg.sender : '';
            },

            message() {
                return this.msg && this.msg.msg ? this.msg.msg : '';
            },

            roomId() {
                return this.msg && this.msg.group_id ? this.msg.group_id : false;
            },

            toastId() {
                return this.msg && this.msg.toast_id ? this.msg.toast_id : 0;
            },
        },

        methods: {
            ...mapActions(toastsStore, ['removeToast']),
            ...mapActions(friendsStore, ['toogleChatbox']),
            openChetbox() {
                this.toogleChatbox(this.roomId);
                this.removeToast(this.toastId);
            },
        },
    }
</script>