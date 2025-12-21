<template>
    <div class="info-toast" :style="{ bottom: toastPos + 'px', right: toastPos + 'px' }">
        <div>
            <p class="toast-head"><span @click="removeToast(toastId)">x</span></p>
            <h5 class="ml-1 mr-1">{{ sender }}</h5>
            <p class="m-1">{{ message }}</p>
        </div>
        <button v-if="roomId" @click="openChetbox" class="btn btn-primary m-1">{{ lg('visit_room') }}</button>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { toastsStore } from '@/stores/toasts';
    import { friendsStore } from '@/stores/friends';

    export default {
        props: ['msg'],
        computed: {
            ...mapState(useLgStore, ['lg']),
            ...mapState(toastsStore, ['toastCount']),
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

            toastPos() {
                return this.toastCount *10 + 20;
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