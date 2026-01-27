<template>
    <div class="admin-resource-holder">
        <div class="admin-resource-side">
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'USERS' }" @click="resource = 'USERS'">Users</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'GROUP' }" @click="resource = 'GROUP'">Groups</button>
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'GROUP_USER' }" @click="resource = 'GROUP_USER'">Group Users</button>
            <button type="button" class="resource-btn">Friends</button>
            <button type="button" class="resource-btn">Chat Messages</button>
            <button type="button" class="resource-btn">Logs</button>
            <button type="button" class="resource-btn">Admin Users</button>
        </div>
        <div class="admin-resource-content">
            <UsersResource v-if="resource == 'USERS'" />
            <GroupsResurce v-if="resource == 'GROUP'" />
            <GroupUsersResource v-if="resource == 'GROUP_USER'" />
        </div>
    </div>
</template>
<script>
    import UsersResource from './UsersResource.vue';
    import GroupsResurce from './GroupsResurce.vue';
    import GroupUsersResource from './GroupUsersResource.vue';

    export default {
        components: {
            UsersResource,
            GroupsResurce,
            GroupUsersResource,
        },

        data() {
            return {
                resource: 'USERS',
            }
        },
    }
</script>