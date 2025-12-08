<template>
    <div class="one-msg">
        <div v-if="msg.reaction" class="msg-reaction-box">
            <p class="msg-rection">{{ msg.reaction }}</p>
            <p class="msg-from-line"><b>{{ msg.from }}</b><small>{{ msg.sendTime }}</small></p>
        </div>
        <div v-else class="msg-text-box" :class="{'owner-msg': ownMsg}">
            <p class="msg-from-line"><b>{{ msg.from }}</b><small>{{ msg.sendTime }}</small></p>
            <div v-if="msg.img" class="msg-img">
                <img :src="msg.img" alt="Chat Image">
            </div>
            <p v-if="msg.msg" class="msg-text">{{ msg.msg }}</p>
        </div>
    </div>
</template>

<script>
    import { mapStores } from 'pinia';
    import { userStore } from '@/stores/user';

    export default {
        props: {
            msg: {
                type: Object,
                default(rawProps) {
                    return {
                        group_id: 0,
                        from_id: 0,
                        from: '',
                        sendTime: '',
                        msg: '',
                        img: null,
                        reaction: null,
                    };
                }
            }
        },

        computed: {
            ...mapStores(userStore),

            ownMsg() {
                return this.userStore.id == this.msg.from_id;
            },
        },
    }
</script>