<template>
    <div class="admin-resource-holder">
        <div class="admin-resource-side">
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'USERS' }" @click="resource = 'USERS'">Users</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'GROUPS' }" @click="resource = 'GROUPS'">Groups</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'GROUP_USERS' }" @click="resource = 'GROUP_USERS'">Group Users</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'FRIENDS' }" @click="resource = 'FRIENDS'">Friends</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'CHAT_MSGS' }" @click="resource = 'CHAT_MSGS'">Chat Messages</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'LOGS' }" @click="resource = 'LOGS'">Logs</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'ADMINS' }" @click="resource = 'ADMINS'">Admin Users</button>
        </div>
        <div class="admin-resource-content">
            <UsersResource v-if="resource == 'USERS'" />
            <GroupsResurce v-if="resource == 'GROUPS'" />
            <GroupUsersResource v-if="resource == 'GROUP_USERS'" />
            <FriendsResource v-if="resource == 'FRIENDS'" />
            <ChatMessagesResource v-if="resource == 'CHAT_MSGS'" />
            <LogsResource v-if="resource == 'LOGS'" />
            <AdminUsersResource v-if="resource == 'ADMINS'" />
        </div>
    </div>
</template>
<script>
    import UsersResource from './UsersResource.vue';
    import GroupsResurce from './GroupsResurce.vue';
    import GroupUsersResource from './GroupUsersResource.vue';
    import FriendsResource from './FriendsResource.vue';
    import ChatMessagesResource from './ChatMessagesResource.vue';
    import LogsResource from './LogsResource.vue';
    import AdminUsersResource from './AdminUsersResource.vue';

    export default {
        components: {
            UsersResource,
            GroupsResurce,
            GroupUsersResource,
            FriendsResource,
            ChatMessagesResource,
            LogsResource,
            AdminUsersResource,
        },

        data() {
            return {
                resource: 'USERS',
            }
        },
    }
</script>