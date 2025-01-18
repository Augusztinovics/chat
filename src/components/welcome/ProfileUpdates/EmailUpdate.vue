<template>
    <div class="profile-updates">
        <div class="profile-updates-body">
            <label for="email_input_field">{{ lg('email') }}</label>
            <input type="text" id="email_input_field" class="mb-2":class="{'invalid-input mb-0': (invalidEmail || emailInUse)}" v-model="newEmail" @input="inputChange">
            <p v-if="invalidEmail" class="invalid-text">{{ lg('enter_valid_email') }}</p>
            <p v-if="emailInUse" class="invalid-text">{{ lg('enter_different_email') }}</p>
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
                newEmail: '',
                invalidEmail: false,
                emailInUse: false,
            }
        },

        computed: {
            ...mapStores(userStore),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            save() {
                if (!this.isValidEmail()) {
                    this.invalidEmail = true;
                    document.getElementById("email_input_field").focus();
                    return;
                }
                this.emailInUse = false;
                let payload = {
                    email: this.newEmail
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
                            this.emailInUse = true;
                            document.getElementById("email_input_field").focus().select();
                        }
                    });
            },
            cancel() {
                this.invalidEmail = false;
                this.newEmail = '';
                this.$emit('cancel');
            },
            isValidEmail() {
                if (this.newEmail == '') return true;
                const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return this.newEmail.match(validRegex);
            },
            inputChange() {
                this.invalidEmail = false;
            }
        },

        mounted() {
            this.invalidEmail = false;
            this.newEmail = this.userStore.email;
            document.getElementById("email_input_field").focus();
        }
    }
</script>
