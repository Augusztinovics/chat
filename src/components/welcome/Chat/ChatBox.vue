<template>
    <div v-if="showChat" class="chat-container">
        <div class="chat-header">
            <!-- Group name, full-screen toogle, close -->
            <h4>The group name</h4>
            <div class="controls">
                <button type="button">
                    <span v-if="fullScreen" class="icon"><IconMinimize /></span>
                    <span v-else class="icon"><IconMaximize /></span>
                </button>
                <button type="button"><span class="icon"><IconX /></span></button>
            </div>
        </div>
        <div class="chat-body">
            <!-- the messages, auto scroll button -->
        </div>
        <div class="chat-footer">
            <!-- message input field, send button, img upload, emojis... -->
             <div>
                <!-- file upload -->
                <span class="icon"><ImageIcon /></span>
             </div>
             <div>
                <!-- emojis -->
                <span class="icon"><EmojiIcon /></span>
             </div>
            <div>
                <input type="text">
                <button type="button" class="chat-send-btn"><span class="icon"><IconSend /></span></button>
            </div>
            <div>
                <!-- reactions -->
                <button type="button" class="reaction-btn">👍</button>
                <button type="button" class="reaction-btn"><span class="icon"><IconDots /></span></button>
            </div>
        </div>
    </div>
</template>

<script>
    import EmojiIcon from '@/components/icons/EmojiIcon.vue';
    import ImageIcon from '@/components/icons/ImageIcon.vue';
    import IconSend from '@/components/icons/IconSend.vue';
    import IconMinimize from '@/components/icons/IconMinimize.vue';
    import IconMaximize from '@/components/icons/IconMaximize.vue';
    import IconX from '@/components/icons/IconX.vue';
    import IconDots from '@/components/icons/IconDots.vue';

    export default {
        components: {
            EmojiIcon,
            ImageIcon,
            IconSend,
            IconMinimize,
            IconMaximize,
            IconX,
            IconDots,
        },
        data() {
            return {
                posX: 0,
                posY: 0,
                showChat: true,
                fullScreen: false,
                tumsUp: '👍',
            }
        },

        computed: {

        },

        methods: {

        },
    }
</script>