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
                <!-- TODO messages container grou id need to replaced with actual group id -->
                <div class="msg-box" ref="msg_box_group_id">
                    <MsgRender v-for="msg in msgs" :msg="msg"/>
                </div>
            </div>
            <!-- Different helper input containers, one at the time can be open or none -->
            <div v-if="openHelper == 'IMG'" class="help-box">
                <div v-if="!img" class="chat-file-input">
                    <input type="file" id="img_input_field" accept="image/*" capture="environment" @change="fileChange"></input>
                </div>
                <div v-if="img" class="chat-img-preview">
                    <img :src="img" alt="Chat Image Preview">
                    <button type="button" @click="emtyFileInput"><span class="icon"><IconX /></span></button>
                </div>
            </div>
            <div v-if="openHelper == 'EMOJI'" class="help-box">
                <Emojis :from="'emoji'" @selected="addEmoji" />
            </div>
            <div v-if="openHelper == 'REACTION'" class="help-box">
                <Emojis :from="'reaction'" @selected="sendReaction" />
            </div>
        </div>
        <div class="chat-footer">
            <!-- message input field, send button, img upload, emojis... -->
             <div class="icon-btn-container">
                <!-- file upload -->
                <button type="button" @click="openHelperContainer('IMG')" :class="{'active': openHelper == 'IMG'}">
                    <span class="icon"><ImageIcon /></span>
                </button>
                <!-- emojis -->
                <button type="button" @click="openHelperContainer('EMOJI')" :class="{'active': openHelper == 'EMOJI'}">
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
                <button type="button" class="reaction-btn" @click="openHelperContainer('REACTION')" :class="{'active': openHelper == 'REACTION'}">
                    <span class="icon"><IconDots /></span>
                </button>
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
    import Emojis from './Emojis.vue';
    import ImgResize from '@/utils/ImgResize.js';
    import MsgRender from './MsgRender.vue';
    import { mapStores } from 'pinia';
    import { userStore } from '@/stores/user';

    export default {
        components: {
            EmojiIcon,
            ImageIcon,
            IconSend,
            IconMinimize,
            IconMaximize,
            IconX,
            IconDots,
            Emojis,
            MsgRender,
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
                msgs: [],
            }
        },

        computed: {
            ...mapStores(userStore),

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
                    from_id: this.userStore.id,
                    from: this.userStore.username,
                    sendTime: this.getFormattedDateTime(),
                    msg: this.msgText,
                    img: this.img,
                    reaction: null,
                };
                console.log(msgData);
                this.msgs.push(msgData);
                this.msgText = '';
                this.img = null; //Maybe will need to empty the file input as well!!!!
                this.openHelper = 'NON';
                this.maxHeight = '100%';
                this.scollToMsgBox();
                this.$refs.msg_text.focus();
            },

            addEmoji(emoji) {
                this.msgText += emoji.emoji;
            },

            sendReaction(reaction) {
                let reactionEmoji = reaction.emoji ?? reaction;
                let msgData = {
                    //Will come from props, now just hardcode
                    group_id: 1,
                    from_id: this.userStore.id,
                    from: this.userStore.username,
                    sendTime: this.getFormattedDateTime(),
                    msg: '',
                    img: null,
                    reaction: reactionEmoji,
                };
                this.openHelper = 'NON';
                this.maxHeight = '100%';
                console.log(msgData);
                this.msgs.push(msgData);
                this.scollToMsgBox();
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
                this.scollToMsgBox();
            },

            fileChange(event) {
                let file = event.target.files[0];
                if (!file) {
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    ImgResize(e.target.result, 1024)
                    .then((r) => {
                        this.img = r;
                    })
                    .catch((e) => {
                        console.log(e);
                        event.target.files = null;
                        this.img = null;
                    })
                };

                reader.onerror = (err) => {
                    event.target.files = null;
                    this.img = null;
                };

                reader.readAsDataURL(file);
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
                this.scollToMsgBox();
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
            },

            getFormattedDateTime() {
                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');

                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                const seconds = now.getSeconds().toString().padStart(2, '0');

                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            },

            scollToMsgBox() {
                setTimeout(() => {
                    if (this.$refs['msg_box_group_id']) {
                        this.$refs['msg_box_group_id'].scrollTop = this.$refs['msg_box_group_id'].scrollHeight;
                    }
                }, 10)
            },
        },
    }
</script>