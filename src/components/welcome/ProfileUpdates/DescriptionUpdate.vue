<template>
    <div class="profile-updates">
        <div class="profile-updates-body">
            <label for="description_input_field">{{ lg('from_self') }}</label>
            <textarea name="description" id="description_input_field" v-model="newDescription"></textarea>
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
                newDescription: '',
                loading: false,
            }
        },

        computed: {
            ...mapStores(userStore),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            save() {
                let payload = {
                    description: this.newDescription
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
                this.newDescription = '';
                this.$emit('cancel');
            },
        },

        mounted() {
            this.newDescription = this.userStore.description;
            document.getElementById("description_input_field").focus();
        }
    }
</script>