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
            Actions!!!
        </div>
        <Modal
            :show="showDetails"
            :size="'md'"
            :title="friend.friendName"
            :showFooter="false"
            @close="modalClose"
        >
            <div>
                <div class="">
                    <img v-if="friend.friendImg" :src="friend.friendImg" alt="Profile Image" class="profile-img md">
                    <span v-else class="icon-lg"><IconUser /></span>
                </div>
                <div>
                    <p><span class="text-bold">{{ lg('city') }} :</span>{{ friend.friendCity ?? '????' }}</p>
                    <p><span class="text-bold">{{ lg('friend_country') }} :</span>{{ friend.friendCountry ?? '????' }}</p>
                    <p><span class="text-bold">{{ lg('friend_des') }}</span></p>
                    <p>{{ friend.friendDescription ?? '??????' }}</p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/IconUser.vue';
    import Modal from '@/components/Modal.vue';
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';

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
            };
        },

        computed: {
            ...mapState(useLgStore, ['lg']),

            hasFriend() {
                return this.friend.friendId != null;
            },
        },

        methods: {
            modalClose() {
                this.showDetails = false;
            },

            openModal() {
                this.showDetails = true;
            },
        },
    }
</script>