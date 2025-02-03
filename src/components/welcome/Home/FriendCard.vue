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
            <div v-else-if="isReqGet">
                <button class="btn-sm btn-primary" @click="acceptFriendRequest" :disabled="sending">{{ sending ? lg('sending') : lg('accept_request') }}</button>
                <button class="btn-sm btn-danger" @click="denieFriendRequest" :disabled="sending">{{ sending ? lg('sending') : lg('denie_request') }}</button>
            </div>
            <p v-else-if="isReqSend">{{ lg('already_send') }}</p>
            <button v-else class="btn-sm btn-primary" @click="openRequestModal" :disabled="sending">{{ sending ? lg('sending') : lg('send_request') }}</button>
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
                    <div v-if="isReqGet">
                        <!-- Request elfogadasa, a kerelem szovege, accept refuse buttons -->
                    </div>
                </div>
            </div>
        </Modal>
        <Modal
            :show="showRequestModal"
            :size="'sm'"
            :title="lg('send_request')"
            :headerClass="'text-left'"
            :showCancel="true"
            :cancelBtnText="lg('cancel')"
            :okBtnText="lg('send')"
            @close="showRequestModal=false"
            @cancel="showRequestModal=false"
            @ok="sendFriendRequest"
        >
            <div class="request-modal-body">
                <p>{{ lg('addresse') }} <span>{{ friend.friendName }}</span></p>
                <label for="request_text_input_field">{{ lg('few_words') }}</label>
                <textarea name="requestText" id="request_text_input_field" v-model="requestText"></textarea>
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
                        sendAcceptedDate:  null,
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
                showRequestModal: false,
                requestText: '',
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

            openRequestModal() {
                this.requestText = '';
                this.showRequestModal = true;
                setTimeout(() => {
                    document.getElementById('request_text_input_field').focus();
                }, 300);
            },

            sendFriendRequest() {
                this.showRequestModal = false;
                this.sending = true;
                this.sendRequest({friendId: this.friend.friendId, text: this.requestText.trim()})
                    .then(() => {
                        this.sending = false;
                        this.requestText = '';
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

            denieFriendRequest() {

            },

            sendMessage() {},
        },
    }
</script>