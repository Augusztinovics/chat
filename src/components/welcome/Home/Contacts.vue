<template>
    <div class="friend-list-container">
        <p class="contact-total">{{ lg('friends_count') }} : {{ numFriends }}</p>
        <div class="friend-list">
            <div v-for="friend in friends" :key="friend.friendId" class="friend-wrapper">
                <div class="friend-data">
                    <div class="friend-img">
                        <img v-if="friend.friendImg" :src="friend.friendImg" alt="Profile Image" class="profile-img sm">
                        <span v-else class="icon-lg"><IconUser /></span>
                    </div>
                    <div>
                        <h5>{{ friend.friendName }}</h5>
                    </div>
                </div>
                <div>
                    <button class="btn-sm btn-primary">{{ lg('send_message') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/IconUser.vue';
    import { mapState } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import { useLgStore } from '@/stores/active__lg';

    export default {
        components: {
            IconUser,
        },

        computed: {
            ...mapState(friendsStore, {
                numFriends: 'numFriends',
                friends: 'allFriends',
            }),
            ...mapState(useLgStore, ['lg']),
        },
    }
</script>