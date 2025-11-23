<template>
    <div>
        <Modal
            :show="showModal"
            :size="'md'"
            :title="modalTitle"
            :headerClass="'text-left'"
            :showFooter="false"
            @close="modalClose"
        >
            <div class="text-left">
                <div v-if="hasUsers">
                    <div v-if="editName">
                        <label for="edit_group_name">{{ lg('group_new_name_lbl') }}</label>
                        <input type="text" id="edit_group_name" @input="clearNameError" v-model="editGroupName">
                        <p v-if="missingGroupName" class="text-danger">{{ lg('group_new_name_missing') }}</p>
                        <div class="text-right mt-1">
                            <button type="button" class="btn-sm btn-secondary ml-1" @click="cancelNameEdit">{{ lg('cancel') }}</button>
                        </div>
                    </div>
                    <div v-else>
                        <h4>{{ modalTitle }} <span class="icon-edit-btn mr-1" @click="startNameEdit"><IconEdit /></span></h4>
                    </div>
                    <hr class="mt-2 mb-2">
                    <div>
                        <p class="text-bold">{{ lg('friends_in_group') }}</p>
                        <div v-for="friend in friendGroup.groupUsers" :key="'existing_friends_' + friend.friendId" class="friend-checkbox danger-check">
                            <input type="checkbox" :id="'existing_friends_' + friend.friendId" :value="friend.friendId" v-model="selectedFriendsForDeleteFromGroup" />
                            <label :for="'existing_friends_' + friend.friendId"><ContactImage :friends="[friend]"/> {{ friend.friendName }} <span v-if="friend.friendCity">( {{ friend.friendCity }} )</span></label>
                        </div>
                    </div>
                    <hr class="mt-2 mb-2">
                    <div v-if="allFriends">
                        <p class="text-bold">{{ lg('friends_outside_group') }}</p>
                        <div v-for="allFriend in allFriends" :key="'all_friends_' + allFriend.friendId">
                            <div v-if="canAddToGroup(allFriend.friendId)" class="friend-checkbox green-check">
                                <input type="checkbox" :id="'all_friends_' + allFriend.friendId" :value="allFriend.friendId" v-model="selectedFriendsToAddGroup" />
                                <label :for="'all_friends_' + allFriend.friendId"><ContactImage :friends="[allFriend]"/> {{ allFriend.friendName }} <span v-if="allFriend.friendCity">( {{ allFriend.friendCity }} )</span></label>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-2">
                        <button type="button" class="btn btn-secondary" @click="modalClose">{{ lg('cancel') }}</button>
                        <button v-if="showSaveBtn && !removeGroup" type="button" class="btn btn-primary ml-1" @click="saveChanges" >{{ lg('save') }}</button>
                        <button v-if="showSaveBtn && removeGroup" type="button" class="btn btn-danger ml-1" @click="saveChanges(e, true)">{{ lg('delete_group') }}</button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapStores, mapState, mapActions } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { friendsStore } from '@/stores/friends';
    import { loadingStore } from '@/stores/loadin';
    import Modal from '@/components/Modal.vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import ContactImage from './ContactImage.vue';

    export default {
        components: {
            Modal,
            IconEdit,
            ContactImage,
        },

        props: ['friendGroup', 'allFriends'],

        data() {
            return {
                editGroupName: '',
                editName: false,
                missingGroupName: false,
                selectedFriendsForDeleteFromGroup: [],
                selectedFriendsToAddGroup: [],
            }
        },

        computed: {
            ...mapStores(loadingStore),
            ...mapState(useLgStore, ['lg']),

            showModal() {
                return this.friendGroup ? true : false;
            },

            modalTitle() {
                return this.friendGroup?.groupName ?? '';
            },

            hasUsers() {
                return this.friendGroup?.groupUsers?.length > 0;
            },

            removeGroup() {
                return this.selectedFriendsForDeleteFromGroup.length == this.friendGroup?.groupUsers?.length &&
                        this.selectedFriendsToAddGroup.length == 0;
            },

           showSaveBtn() {
                return (this.selectedFriendsForDeleteFromGroup.length > 0) ||
                        (this.selectedFriendsToAddGroup.length > 0) ||
                        (this.editName && this.editGroupName != this.modalTitle);
           },
        },

        methods: {
            ...mapActions(friendsStore, ['updateGroup', 'loadFriends']),
            modalClose(msg = false) {
                this.editGroupName = '';
                this.editName = false;
                this.selectedFriendsForDeleteFromGroup = [];
                this.selectedFriendsToAddGroup = [];
                this.$emit('closeEditDetails', msg);
            },

            startNameEdit() {
                this.editGroupName = this.modalTitle;
                this.missingGroupName = false;
                this.editName = true;
                setTimeout(() => {
                    document.getElementById("edit_group_name").focus();
                }, 300);
            },

            cancelNameEdit() {
                this.editGroupName = '';
                this.editName = false;
                this.missingGroupName = false;
            },

            clearNameError() {
                this.missingGroupName = false;
            },

            canAddToGroup(frienId) {
                if (this.friendGroup?.groupUsers) {
                    let friend = this.friendGroup.groupUsers.find(f => f.friendId == frienId);
                    return friend ? false : true;
                }
                return true;
            },

            saveChanges(e, del = false) {
                if (!this.showSaveBtn) {
                    return;
                }
                if (this.editName && this.editGroupName.trim() == '' && !del) {
                    this.missingGroupName = true;
                    document.getElementById("edit_group_name").focus();
                    return;
                }

                this.loadingStore.startLoading();

                let submitData = {
                    groupId: this.friendGroup.groupId,
                    del: del,
                };
                if (!del) {
                    if (this.editName) {
                        submitData.groupName = this.editGroupName.trim()
                    }
                    if (this.selectedFriendsForDeleteFromGroup.length > 0) {
                        submitData.removeIds = this.selectedFriendsForDeleteFromGroup;
                    }
                    if (this.selectedFriendsToAddGroup.length > 0) {
                        submitData.addIds = this.selectedFriendsToAddGroup;
                    }
                }

                this.updateGroup(submitData)
                    .then(() => {
                        this.loadFriends();
                        this.loadingStore.finishLoading();
                        this.modalClose('SUC');
                        //TODO fire group update event!!!!!
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.modalClose('ER');
                        }
                    });
            },
        },
    }
</script>