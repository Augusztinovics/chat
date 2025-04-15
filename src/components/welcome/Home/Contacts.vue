<template>
    <div>
        <h2>Friends count: {{ numFriends }}</h2>
        <p v-for="friend in friends" :key="friend.friendId">{{ friend.friendName }}</p>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { friendsStore } from '@/stores/friends';

    export default {
        computed: {
            ...mapState(friendsStore, {
                numFriends: 'numFriends',
                friends: 'allFriends',
            }),
        },
    }
</script>