<template>
    <div class="admin-resource-holder">
        <div class="admin-resource-side">
            <button type="button" class="resource-btn" :class="{ 'active': resource == 'USERS' }" @click="resource = 'USERS'">Users</button>
            <button type="button" class="resource-btn">Groups</button>
            <button type="button" class="resource-btn">Group Users</button>
            <button type="button" class="resource-btn">Friends</button>
            <button type="button" class="resource-btn">Chat Messages</button>
            <button type="button" class="resource-btn">Logs</button>
            <button type="button" class="resource-btn">Admin Users</button>
        </div>
        <div class="admin-resource-content">
            <UsersResource v-if="resource == 'USERS'" />
        </div>
    </div>
</template>
<script>
    import UsersResource from './UsersResource.vue';

    export default {
        components: {
            UsersResource,
        },

        data() {
            return {
                resource: 'USERS',
            }
        },
    }
</script>