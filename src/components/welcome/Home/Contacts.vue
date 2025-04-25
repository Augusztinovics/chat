<template>
    <div class="friend-list-container">
        <div class="friend-actions">
            <p class="contact-total">{{ lg('friends_count') }} : {{ numGroups }}</p>
            <button class="btn-sm btn-secondary">{{ lg('create_group') }}</button>
        </div>
        
        <div class="friend-list">
            <div v-for="card in groupCards" :key="card.groupId" class="friend-wrapper mb-1">
                <div class="friend-data">
                    <ContactImage :friends="card.groupUsers"/>
                    <div>
                        <h5>{{ card.groupName }}</h5>
                    </div>
                </div>
                <div>
                    <button class="btn-sm btn-primary">{{ lg('send_message') }}</button>
                </div>
            </div>
        </div>

        <SuccessToast v-if="saveSuccess"/>
        <FailToast v-if="saveError"/>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import { useLgStore } from '@/stores/active__lg';
    import { userStore } from '@/stores/user';
    import ContactImage from './ContactImage.vue';
    import Modal from '@/components/Modal.vue';
    import SuccessToast from '@/components/SuccessToast.vue';
    import FailToast from '@/components/FailToast.vue';
    import { loadingStore } from '@/stores/loadin';

    export default {
        components: {
            Modal,
            ContactImage,
            SuccessToast,
            FailToast,
        },

        data() {
            return {
                showCreateGroupModal: false,
                saveError: false,
                saveSuccess: false,
            }
        },

        computed: {
            ...mapStores(userStore, loadingStore),
            ...mapState(friendsStore, {
                numFriends: 'numFriends',
                friends: 'allFriends',
                groups: 'allGroups',
                numGroups: 'numGroups',
                friendData: 'getFriendData',
            }),
            ...mapState(useLgStore, ['lg']),

            groupCards() {
                let cards = [];
                this.groups.forEach(g => {
                    let oneCard = {
                        groupId: g.id,
                        groupName: g.group_name,
                        groupCreated: g.created_at,
                        groupUsers: [],
                    };
                    g.users.forEach(gu => {
                        if (gu !== this.userStore.id) {
                            let data = this.friendData(gu);
                            if (data) {
                                oneCard.groupUsers.push(data);
                            }
                        }
                    });
                    cards.push(oneCard);
                });
                return cards;
            },
        },
    }
</script>