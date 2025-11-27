<template>
    <div v-if="showChat" 
        class="chat-container"
        :class="{'full-screen': fullScreen, 'closing': closing}"
        :style="{ left: xVW + 'vw', top: yVH + 'vh' }"
    >
        <div class="chat-header"  @mousedown="startDrag" @touchstart="startDrag">
            <!-- Group name, full-screen toogle, close -->
            <h4>The group name</h4>
            <div class="controls">
                <button type="button" class="minimaize-btn" @click="toogleFullScreen">
                    <span v-if="fullScreen" class="icon"><IconMinimize /></span>
                    <span v-else class="icon"><IconMaximize /></span>
                </button>
                <button type="button" @click="closeChat"><span class="icon"><IconX /></span></button>
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
                xVW: 1, // position in vw units
                yVH: 1, // position in vh units
                dragging: false,
                startX: 0,
                startY: 0,
                showChat: true,
                closing: false,
                fullScreen: false,
                tumsUp: '👍',
            }
        },

        computed: {

        },

        methods: {
            closeChat() {
                this.closing = true;
                setTimeout(() => {
                    this.showChat = false;
                    this.closing = false;
                }, 150);
            },

            toogleFullScreen() {
                this.fullScreen = !this.fullScreen;
                if (this.fullScreen) {
                    if (this.dragging) {
                        this.endDrag();
                    }
                    this.xVW = 1;
                    this.yVH = 1;
                }
            },

            startDrag(e) {
                if (this.fullScreen) {
                    return;
                }
                this.dragging = true;

                const point = this.getPoint(e);
                this.startX = point.x - this.vwToPx(this.xVW);
                this.startY = point.y - this.vhToPx(this.yVH);

                window.addEventListener("mousemove", this.onDrag);
                window.addEventListener("mouseup", this.endDrag);

                window.addEventListener("touchmove", this.onDrag, { passive: false });
                window.addEventListener("touchend", this.endDrag);
            },

            onDrag(e) {
                if (!this.dragging) return;

                e.preventDefault();

                const point = this.getPoint(e);
                const newXvw = ((point.x - this.startX) / window.innerWidth) * 100;
                const newYvh = ((point.y - this.startY) / window.innerHeight) * 100;

                this.xVW = Math.max(0, Math.min(75, newXvw));
                this.yVH = Math.max(0, Math.min(75, newYvh));
            },

            endDrag() {
                this.dragging = false;

                window.removeEventListener("mousemove", this.onDrag);
                window.removeEventListener("mouseup", this.endDrag);

                window.removeEventListener("touchmove", this.onDrag);
                window.removeEventListener("touchend", this.endDrag);
            },

            getPoint(e) {
                if (e.touches) {
                    return {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                    };
                }
                return { x: e.clientX, y: e.clientY };
            },

            vwToPx(v) {
                return (window.innerWidth * v) / 100;
            },

            vhToPx(v) {
                return (window.innerHeight * v) / 100;
            }
        },
    }
</script>