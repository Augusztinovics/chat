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
                <p><small><b>{{ lg('group_created_date') }}:</b> {{ groupCreatedDate }}</small></p>
                <div v-if="hasUsers">
                    <div v-if="onlyOneUser">
                        <div class="mt-1 mb-2">
                            <sup class="user-active" :class="{'active' : isFriendActive(getUserData.friendId)}">&#11044;</sup>
                            <img v-if="getUserData.friendImg" :src="getUserData.friendImg" alt="Profile Image" class="profile-img md">
                            <span v-else class="profile-init-lg">{{ friendInitiative(getUserData.friendName) }}</span>
                        </div>
                        <div class="friend-modal-des">
                            <p><span class="text-bold">{{ lg('friend_name') }} :</span>{{ getUserData.friendName ?? '????' }}</p>
                            <p><span class="text-bold">{{ lg('city') }} :</span>{{ getUserData.friendCity ?? '????' }}</p>
                            <p><span class="text-bold">{{ lg('friend_country') }} :</span>{{ getUserData.friendCountry ?? '????' }}</p>
                            <p><span class="text-bold">{{ lg('friend_des') }} :</span></p>
                            <p class="mb-2">{{ getUserData.friendDescription ?? '??????' }}</p>
                        </div>
                    </div>
                    <div v-else class="contact-tabs left-tabs mt-1">
                        <!-- the tabs -->
                        <div class="tab">
                            <span class="tab-menu" :class="{'active-tab': isListView}" @click="toogleTabView()">
                                <span class="icon"><IconIdCard /></span>
                            </span>
                            <span class="tab-menu" :class="{'active-tab': !isListView}" @click="toogleTabView()">
                                <span class="icon"><IconUser /></span>
                            </span>
                        </div>

                        <div class="tab-content">
                            <!-- The list view of the group users -->
                            <div v-if="isListView">
                                <ul>
                                    <li v-for="(friend, index) in friendGroup.groupUsers" :key="'friend_list_' + index" class="mb-1">
                                        <p><span class="friend-img">
                                            <sup class="user-active" :class="{'active' : isFriendActive(friend.friendId)}">&#11044;</sup>
                                            <img v-if="friend.friendImg" :src="friend.friendImg" alt="Profile Image" class="profile-img sm">
                                            <span v-else class="profile-init">{{ friendInitiative(friend.friendName) }}</span>
                                            </span> <span @click="viewDetails(index)" class="btn-link-no-underline text-bold font-lg">
                                                {{ friend.friendName }}
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div v-else>
                                <div class="mt-1 mb-2">
                                    <sup class="user-active" :class="{'active' : isFriendActive(getUserData.friendId)}">&#11044;</sup>
                                    <img v-if="getUserData.friendImg" :src="getUserData.friendImg" alt="Profile Image" class="profile-img md">
                                    <span v-else class="profile-init-lg">{{ friendInitiative(getUserData.friendName) }}</span>
                                </div>
                                <div class="friend-modal-des">
                                    <p><span class="text-bold">{{ lg('friend_name') }} :</span>{{ getUserData.friendName ?? '????' }}</p>
                                    <p><span class="text-bold">{{ lg('city') }} :</span>{{ getUserData.friendCity ?? '????' }}</p>
                                    <p><span class="text-bold">{{ lg('friend_country') }} :</span>{{ getUserData.friendCountry ?? '????' }}</p>
                                    <p><span class="text-bold">{{ lg('friend_des') }} :</span></p>
                                    <p class="mb-2">{{ getUserData.friendDescription ?? '??????' }}</p>
                                </div>
                                <div class="text-center">
                                    <button v-if="paginationIndex > 0" type="button" class="btn pag-btn" @click="paginateLeft">&lt;</button>
                                    <button v-if="paginationIndex < paginationLength" type="button" class="btn pag-btn" @click="paginatRight">&gt;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { friendsStore } from '@/stores/friends';
    import Modal from '@/components/Modal.vue';
    import IconUser from '@/components/icons/IconUser.vue';
    import IconIdCard from '@/components/icons/IconIdCard.vue';

    export default {
        components: {
            Modal,
            IconUser,
            IconIdCard,
        },

        props: ['friendGroup'],

        data() {
            return {
                paginationIndex: 0,
                isListView: true,
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),
            ...mapState(friendsStore, ['isFriendActive']),

            showModal() {
                return this.friendGroup ? true : false;
            },

            modalTitle() {
                return this.friendGroup?.groupName ?? '';
            },

            groupCreatedDate() {
                return this.friendGroup?.groupCreated ?? '';
            },

            hasUsers() {
                return this.friendGroup?.groupUsers?.length > 0;
            },

            onlyOneUser() {
                return this.friendGroup?.groupUsers?.length == 1;
            },

            getUserData() {
                if (this.hasUsers && this.paginationIndex < this.friendGroup?.groupUsers?.length) {
                    return this.friendGroup.groupUsers[this.paginationIndex];
                } else {
                    return {
                        friendCity: null,
                        friendCountry: null,
                        friendDescription: null,
                        friendImg: null,
                        friendName: null,
                    };
                }
            },

            friendInitiative() {
                return (friendName) => {
                    let nameArray = friendName.split(' ');
                    let initiative = '';
                    nameArray.forEach(n => {
                        if (n) {
                            initiative += n.charAt(0)
                        }
                    });
                    if (initiative) {
                        return initiative.toUpperCase();
                    } else {
                        return 'F';
                    }
                }
            },

            paginationLength() {
                return this.friendGroup?.groupUsers?.length ? this.friendGroup.groupUsers.length - 1 : 0;
            }
        },

        methods: {
            modalClose() {
                this.paginationIndex = 0;
                this.isListView = true;
                this.$emit('closeDetails');
            },

            toogleTabView() {
                this.paginationIndex = 0;
                this.isListView = !this.isListView;
            },

            paginateLeft() {
                if (this.paginationIndex < 1) return;
                this.paginationIndex--;
            },

            paginatRight() {
                if (this.paginationIndex >= this.paginationLength) return;
                this.paginationIndex++;
            },

            viewDetails(index) {
                this.paginationIndex = index;
                this.isListView = false;
            }
        },
    }
</script>