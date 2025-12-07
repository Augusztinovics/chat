<template>
    <div>
        <div v-if="msg.reaction">
            <p>{{ msg.reaction }}</p>
            <p><b>{{ msg.from }}</b><small>{{ msg.sendTime }}</small></p>
        </div>
        <div v-else>
            <p><b>{{ msg.from }}</b><small>{{ msg.sendTime }}</small></p>
            <div v-if="msg.img">
                <img :src="msg.img" alt="Chat Image">
            </div>
            <p v-if="msg.msg">{{ msg.msg }}</p>
        </div>
    </div>
</template>

<script>
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
        }
    }
</script>