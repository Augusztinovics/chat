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
            <!-- the messages and users in group conteiners-->
            <div class="msg-and-user" :style="{'max-height' : maxHeight}">
                <!-- Users in group container -->
                <div class="user-box">

                </div>
                <!-- messages container -->
                <div class="msg-box">
                    <p>first message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>second message</p>
                    <p>last message</p>
                </div>
            </div>
            <!-- Different helper input containers, one at the time can be open or none -->
            <div v-if="openHelper == 'IMG'" class="help-box">
                Image upload!!!!
            </div>
            <div v-if="openHelper == 'EMOJI'" class="help-box">
                Emmojiiiisss!!!!
            </div>
            <div v-if="openHelper == 'REACTION'" class="help-box">
                Reactions!!!!
            </div>
        </div>
        <div class="chat-footer">
            <!-- message input field, send button, img upload, emojis... -->
             <div class="icon-btn-container">
                <!-- file upload -->
                <button type="button" @click="openHelperContainer('IMG')">
                    <span class="icon"><ImageIcon /></span>
                </button>
                <!-- emojis -->
                <button type="button" @click="openHelperContainer('EMOJI')">
                    <span class="icon"><EmojiIcon /></span>
                </button>
             </div>
            <div class="msg-input-container">
                <input type="text" name="msg_text" ref="msg_text" @keyup.enter="sendMsg" v-model="msgText" />
                <button v-if="showSendBtn" type="button" class="chat-send-btn" @click="sendMsg"><span class="icon"><IconSend /></span></button>
            </div>
            <div class="icon-btn-container reaction">
                <!-- reactions -->
                <button type="button" class="reaction-btn" @click="sendReaction('👍')">👍</button>
                <button type="button" class="reaction-btn" @click="openHelperContainer('REACTION')"><span class="icon"><IconDots /></span></button>
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
                img: null,
                msgText: '',
                openHelper: 'NON',
                maxHeight: '100%',
            }
        },

        computed: {
            showSendBtn() {
                return this.img || this.msgText.length > 0;
            },
        },

        methods: {
            sendMsg() {
                if (!this.showSendBtn) return;
                //DODO
                let msgData = {
                    //Will come from props, now just hardcode
                    group_id: 1,
                    //Will come from props, now just hardcode
                    from_id: 1,
                    //Will come from props, now just hardcode
                    from: 'Somebody',
                    msg: this.msgText,
                    img: this.img,
                    reaction: null,
                };
                console.log(msgData);
                this.msgText = '';
                this.img = null; //Maybe will need to empty the file input as well!!!!
                this.$refs.msg_text.focus();
            },

            sendReaction(reaction) {
                let msgData = {
                    //Will come from props, now just hardcode
                    group_id: 1,
                    //Will come from props, now just hardcode
                    from_id: 1,
                    //Will come from props, now just hardcode
                    from: 'Somebody',
                    msg: '',
                    img: null,
                    reaction: reaction,
                };
                console.log(msgData);
            },

            openHelperContainer(helper) {
                this.emtyFileInput();
                if (helper == this.openHelper) {
                    //Toogle of the helper
                    this.openHelper = 'NON';
                    this.maxHeight = '100%';
                } else {
                    this.openHelper = helper;
                    if (this.fullScreen) {
                        this.maxHeight = '85%';
                    } else {
                        this.maxHeight = '70%';
                    }
                }
            },

            emtyFileInput() {
                //Need to empty the file input, for now just
                this.img = null;
            },

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
                if (this.openHelper != 'NON') {
                    if (this.fullScreen) {
                        this.maxHeight = '85%';
                    } else {
                        this.maxHeight = '70%';
                    }
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