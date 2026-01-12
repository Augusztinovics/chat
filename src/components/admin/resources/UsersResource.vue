<template>
    <div>
        <div v-if="userDetail">

        </div>
        <div v-else>

        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                users: [],
                userDetail: null,
                isEdit: false,
                limit: 10,
                offset: 1,
                totalCount: 0,
            }
        },
    }
</script>