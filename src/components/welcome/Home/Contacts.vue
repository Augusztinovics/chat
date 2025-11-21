<template>
    <div class="friend-list-container">
        <div class="friend-actions">
            <p class="contact-total">{{ lg('friends_and_groups_count') }} : {{ numGroups }}</p>
            <button class="btn-sm btn-secondary" @click="createGroupModalOpen">{{ lg('create_group') }}</button>
        </div>
        
        <div class="friend-list">
            <div v-for="card in groupCards" :key="card.groupId" class="friend-wrapper mb-1">
                <div class="friend-data">
                    <ContactImage :friends="card.groupUsers"/>
                    <div>
                        <h5 @click="showGroupDetail(card)">{{ card.groupName }}</h5>
                    </div>
                </div>

                <!-- TODO: Responsive style -->
                <div>
                    <span v-if="card.owner" class="icon-edit-btn mr-1" @click="showGroupEdit(card)"><IconEdit /></span>
                    <button class="btn-sm btn-primary">{{ lg('send_message') }}</button>
                </div>
                <!-- END TODO -->

            </div>
        </div>

        <Modal 
            :show="showCreateGroupModal"
            :size="'lg'"
            :title="lg('create_group')"
            :showFooter="false"
            @close="createGroupModalClose"
        >
            <div>
                <div>
                    <label for="new_group_name">{{ lg('new_group_name_lbl') }}</label>
                    <input type="text" id="new_group_name" @input="clearNameError" v-model="newGroupName">
                    <p v-if="missingGroupName" class="text-danger">{{ lg('new_group_name_missing') }}</p>
                </div>
                <hr class="mt-2">
                <div>
                    <p class="contact-total">{{ lg('friends_count') }} : {{ numFriends }}</p>
                    <div v-for="friend in friends" :key="'friends_' + friend.friendId" class="friend-checkbox">
                        <input type="checkbox" :id="'friend_' + friend.friendId" :value="friend.friendId" @change="checkBoxChange" v-model="selectedFriendsForNewGroup" />
                        <label :for="'friend_' + friend.friendId"><ContactImage :friends="[friend]"/> {{ friend.friendName }} <span v-if="friend.friendCity">( {{ friend.friendCity }} )</span></label>
                    </div>
                    <p v-if="noFriendSelected" class="text-danger">{{ lg('no_friend_selected') }}</p>
                </div>
                <div class="mt-2">
                    <button class="btn btn-primary" @click="validateAndCreateGroup">{{ lg('create_group') }}</button>
                </div>
            </div>
        </Modal>

        <ContactGroupDetailModal :friendGroup="groupDetail" @closeDetails="hideGroupDetail" />
        <EditContactModal :friendGroup="groupEdit" :allFriends="friends" @closeEditDetails="hideGroupEdit" />

        <SuccessToast v-if="saveSuccess"/>
        <FailToast v-if="saveError"/>
    </div>
</template>

<script>
    import { mapStores, mapState, mapActions } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import { useLgStore } from '@/stores/active__lg';
    import { userStore } from '@/stores/user';
    import ContactImage from './ContactImage.vue';
    import Modal from '@/components/Modal.vue';
    import SuccessToast from '@/components/SuccessToast.vue';
    import FailToast from '@/components/FailToast.vue';
    import { loadingStore } from '@/stores/loadin';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import ContactGroupDetailModal from './ContactGroupDetailModal.vue';
    import EditContactModal from './EditContactModal.vue';

    export default {
        components: {
            Modal,
            ContactImage,
            SuccessToast,
            FailToast,
            IconEdit,
            ContactGroupDetailModal,
            EditContactModal,
        },

        data() {
            return {
                showCreateGroupModal: false,
                saveError: false,
                saveSuccess: false,
                newGroupName: '',
                missingGroupName: false,
                selectedFriendsForNewGroup: [],
                noFriendSelected: false,
                groupDetail: null,
                groupEdit: null,
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
                        owner: g.main_user == this.userStore.id,
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

        methods: {
            ...mapActions(friendsStore, ['createGroup', 'loadFriends']),

            createGroupModalOpen() {
                this.newGroupName = '';
                this.missingGroupName = false;
                this.selectedFriendsForNewGroup = [];
                this.noFriendSelected = false;
                this.showCreateGroupModal = true;
                setTimeout(() => {
                    document.getElementById("new_group_name").focus();
                }, 500);
            },

            createGroupModalClose() {
                this.showCreateGroupModal = false;
            },

            clearNameError() {
                this.missingGroupName = false;
            },

            checkBoxChange() {
                this.noFriendSelected = false;
            },

            validateAndCreateGroup() {
                if (this.newGroupName.trim() == '') {
                    this.missingGroupName = true;
                    document.getElementById("new_group_name").focus();
                }
                if (this.selectedFriendsForNewGroup.length < 1) {
                    this.noFriendSelected = true;
                }
                if (this.missingGroupName || this.noFriendSelected) {
                    return;
                }

                this.saveSuccess = false;
                this.loadingStore.startLoading();
                this.createGroup({groupName: this.newGroupName.trim(), friends: this.selectedFriendsForNewGroup})
                    .then(() => {
                        this.loadFriends();
                        this.loadingStore.finishLoading();
                        this.createGroupModalClose();
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.createGroupModalClose();
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.saveError = true;
                            setTimeout(() => {
                                this.saveError = false;
                            }, 3000);
                        }
                    });
            },

            showGroupDetail(group) {
                this.groupDetail = group;
            },

            hideGroupDetail() {
                this.groupDetail = null;
            },

            showGroupEdit(group) {
                console.log(group);
                this.groupEdit = group;
            },

            hideGroupEdit(msg) {
                this.groupEdit = null;
                if (msg) {
                    if (msg == 'SUC') {
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    }
                    if (msg == 'ER') {
                        this.saveError = true;
                        setTimeout(() => {
                            this.saveError = false;
                        }, 3000);
                    }
                }
            },
        },
    }
</script>