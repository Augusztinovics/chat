<template>
    <div class="chat-users">
        <div v-for="user in users" :key="'box_user_' + user.friendId" class="chat-user">
            <div>
                <sup class="user-active" :class="{'active' : isFriendActive(user.friendId)}">&#11044;</sup>
                <ContactImage :friends="[user]"/>
            </div>
            <p><b>{{ user.friendName }}</b></p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { friendsStore } from '@/stores/friends';
    import ContactImage from '@/components/welcome/Home/ContactImage.vue';

    export default {
        components: {
            ContactImage,
        },

        props: ['users'],

        computed: {
            ...mapState(friendsStore, ['isFriendActive']),
        },
    }
</script>