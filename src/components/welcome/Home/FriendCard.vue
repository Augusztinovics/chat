<template>
    <div v-if="hasFriend" class="friend-card">
        <div class="friend-card-img">
            <img v-if="friend.friendImg" :src="friend.friendImg" alt="Profile Image" class="profile-img md">
            <span v-else class="icon-lg"><IconUser /></span>
        </div>
        <div class="friend-card-name">
            <h5>{{ friend.friendName }}</h5>
        </div>
        <div class="friend-card-action">
            Actions!!!
        </div>
    </div>
</template>

<script>
    import IconUser from '@/components/icons/IconUser.vue';

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
        },

        computed: {
            hasFriend() {
                return this.friend.friendId != null;
            }
        },
    }
</script>