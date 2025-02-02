<template>
    <div v-if="hasFriend" class="friend-card">
        <div class="friend-card-img">
            <img v-if="friend.friendImg" :src="friend.friendImg" alt="Profile Image" class="profile-img md">
            <span v-else class="icon-lg"><IconUser /></span>
        </div>
        <div class="friend-card-name" @click="openModal">
            <h5>{{ friend.friendName }}</h5>
        </div>
        <div class="friend-card-action">
            <button v-if="isFriend" class="btn-sm btn-primary" @click="sendMessage" :disabled="sending">{{ sending ? lg('sending') : lg('send_message') }}</button>
            <button v-else-if="isReqGet" class="btn-sm btn-primary" @click="acceptFriendRequest" :disabled="sending">{{ sending ? lg('sending') : lg('accept_request') }}</button>
            <p v-else-if="isReqSend">{{ lg('already_send') }}</p>
            <button v-else class="btn-sm btn-primary" @click="sendFriendRequest" :disabled="sending">{{ sending ? lg('sending') : lg('send_request') }}</button>
        </div>
        <Modal
            :show="showDetails"
            :size="'md'"
            :title="friend.friendName"
            :headerClass="'text-left'"
            :showFooter="false"
            @close="modalClose"
        >
            <div class="text-left">
                <div class="text-center mt-1 mb-2">
                    <img v-if="friend.friendImg" :src="friend.friendImg" alt="Profile Image" class="profile-img md">
                    <span v-else class="icon-lg"><IconUser /></span>
                </div>
                <div class="friend-modal-des">
                    <p><span class="text-bold">{{ lg('city') }} :</span>{{ friend.friendCity ?? '????' }}</p>
                    <p><span class="text-bold">{{ lg('friend_country') }} :</span>{{ friend.friendCountry ?? '????' }}</p>
                    <p><span class="text-bold">{{ lg('friend_des') }}</span></p>
                    <p class="mb-2">{{ friend.friendDescription ?? '??????' }}</p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/IconUser.vue';
    import Modal from '@/components/Modal.vue';
    import { mapState, mapActions } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { requestSendStore } from '@/stores/request_send';
    import { requestGetStore } from '@/stores/request_get';

    export default {
        props: {
            friend: {
                type: Object,
                default(rawProps) {
                    return { 
                        friendId:          null,
                        friendName:        '',
                        friendDescription: '',
                        friendCountry:     '',
                        friendCity:        '',
                        friendImg:         null,
                        reqId:             null,
                        reqAcceptedDate:   null,
                        sendId:            null,
                        sendAcceptedDate:  null
                    };
                }
            }
        },

        components: {
            IconUser,
            Modal,
        },

        data() {
            return {
                showDetails: false,
                sending: false,
            };
        },

        computed: {
            ...mapState(useLgStore, ['lg']),

            hasFriend() {
                return this.friend.friendId != null;
            },

            isFriend() {
                return ((this.friend.reqId && this.friend.reqAcceptedDate) || (this.friend.sendId && this.friend.sendAcceptedDate));
            },

            isReqGet() {
                return this.friend.reqId && !this.friend.reqAcceptedDate;
            },

            isReqSend() {
                return this.friend.sendId && !this.friend.sendAcceptedDate;
            },
        },

        methods: {
            ...mapActions(requestSendStore, ['sendRequest']),
            ...mapActions(requestGetStore, ['acceptRequest']),

            modalClose() {
                this.showDetails = false;
            },

            openModal() {
                this.showDetails = true;
            },

            sendFriendRequest() {
                this.sending = true;
                this.sendRequest({friendId: this.friend.friendId})
                    .then(() => {
                        this.sending = false;
                        //the store will reload, here just dumy out for change
                        this.friend.sendId = 1;
                    })
                    .catch(() => {
                        this.sending = false;
                        //Handle somehow the error, maybe emit?
                    });
            },

            acceptFriendRequest() {
                this.sending = true;
                this.acceptRequest({friendId: this.friend.friendId, reqId: this.friend.reqId})
                    .then(() => {
                        this.sending = false;
                        //the store will reload, here just dumy out for change
                        this.friend.reqAcceptedDate = true;
                    })
                    .catch(() => {
                        this.sending = false;
                        //Handle somehow the error, maybe emit?
                    });
            },

            sendMessage() {},
        },
    }
</script>