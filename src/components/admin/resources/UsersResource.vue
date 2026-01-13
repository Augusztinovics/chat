<template>
    <div class="resurce">
        <div v-if="userDetail">

        </div>
        <div v-else>
            <h2>Users</h2>
            <div class="resurce-control">
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="searchUsers">
                    <button type="button" @click="searchUsers" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit">
                        <option value="5">5 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchUsers">Fetch All Users</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Language</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Description</th>
                    <th>Created At</th>
                </tr>
                <tr v-for="user in users">
                    <td>{{ user.id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.lg }}</td>
                    <td>{{ user.country }}</td>
                    <td>{{ user.city }}</td>
                    <td>{{ user.description }}</td>
                    <td>{{ user.created_at }}</td>
                </tr>
            </table>
            <div>
                Pagination
            </div>
        </div>
    </div>
</template>
<script>
    import IconSearch from '@/components/icons/IconSearch.vue';

    export default {
        components: {
            IconSearch,
        },

        data() {
            return {
                users: [],
                userDetail: null,
                isEdit: false,
                limit: 10,
                offset: 1,
                totalCount: 0,
                searchText: '',
                submitting: false,
            }
        },

        computed: {},
        methods: {
            searchUsers() {

            },

            fetchUsers() {

            }
        },
    }
</script>