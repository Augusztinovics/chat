<template>
    <div class="friend-img">
        <span v-if="friends.length < 1">
            <span>?</span>
        </span>
        <span v-else-if="friends.length == 1">
            <img v-if="friends[0].friendImg" :src="friends[0].friendImg" alt="Profile Image" class="profile-img sm">
            <span v-else class="profile-init">{{ friendInitiative(friends[0].friendName) }}</span>
        </span>
        <span v-else-if="friends.length == 2">
            <img v-if="friends[0].friendImg" :src="friends[0].friendImg" alt="Profile Image" class="profile-img sm">
            <span v-else class="profile-init">{{ friendInitiative(friends[0].friendName) }}</span>
            <img v-if="friends[1].friendImg" :src="friends[1].friendImg" alt="Profile Image" class="profile-img sm">
            <span v-else class="profile-init">{{ friendInitiative(friends[1].friendName) }}</span>
        </span>
        <span v-else>
            <img v-if="friends[0].friendImg" :src="friends[0].friendImg" alt="Profile Image" class="profile-img sm">
            <span v-else class="profile-init">{{ friendInitiative(friends[0].friendName) }}</span>
            <img v-if="friends[1].friendImg" :src="friends[1].friendImg" alt="Profile Image" class="profile-img sm">
            <span v-else class="profile-init">{{ friendInitiative(friends[1].friendName) }}</span>
            <img v-if="friends[2].friendImg" :src="friends[2].friendImg" alt="Profile Image" class="profile-img sm">
            <span v-else class="profile-init">{{ friendInitiative(friends[2].friendName) }}</span>
            <b v-if="friends.length > 3">
                + {{ friends.length - 3 }}
            </b>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            friends: Array,
        },

        computed: {
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
        },
    }
</script>