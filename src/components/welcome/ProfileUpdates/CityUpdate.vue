<template>
    <div class="profile-updates">
        <div class="profile-updates-body">
            <label for="city_input_field">{{ lg('city') }}</label>
            <input type="text" id="city_input_field" class="mb-2" v-model="newCity">
        </div>
        <div class="profile-updates-btns">
            <button type="button" class="btn btn-secondary" @click="cancel">{{ lg('cancel') }}</button>
            <button type="button" class="btn btn-primary" @click="save">{{ lg('save') }}</button>
        </div>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { userStore } from '@/stores/user';
    import { useLgStore } from '@/stores/active__lg';

    export default {
        data() {
            return {
                newCity: '',
            }
        },

        computed: {
            ...mapStores(userStore),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            save() {
                let payload = {
                    city: this.newCity
                }
                this.$emit('startLoading');
                this.userStore.updateUser(payload)
                    .then(() => {
                        this.$emit('finishLoading');
                        this.$emit('success');
                    })
                    .catch((e) => {
                        this.$emit('finishLoading');
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.$emit('fail');
                        }
                    });
            },
            cancel() {
                this.newCity = '';
                this.$emit('cancel');
            },
        },

        mounted() {
            this.newCity = this.userStore.city;
            document.getElementById("city_input_field").focus();
        }
    }
</script>
