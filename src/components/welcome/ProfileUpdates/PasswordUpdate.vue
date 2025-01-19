<template>
    <div class="profile-updates">
        <div class="profile-updates-body">
            <div class="mt-1">
                <label for="new_password_input">{{ lg('new_password') }} <span>*</span></label>
                <div class="password-container">
                    <input id="new_password_input" :type="newPasswordInputType" :class="{'invalid-input': missingNewPassword}" v-model="newPassword" @input="clearErrors" :disabled="submitting">
                    <button type="button" @click="toogleShowNewPassword">
                        <span class="icon"><IconEyeClose v-if="showNewPassword" /><IconEyeOpen v-else /></span>
                    </button>
                </div>
                <p v-if="missingNewPassword" class="invalid-text">{{ lg('missing_password') }}</p>
            </div>

            <div class="mt-1">
                <label for="new_password_repeate">{{ lg('new_password_again') }} <span>*</span></label>
                <div class="password-container">
                    <input id="new_password_repeate" :type="repeateNewPasswordInputType" :class="{'invalid-input': (missingNewPasswordRepeate || mismatchNewPassword)}" v-model="newPasswordRepeate" @input="clearErrors" :disabled="submitting">
                    <button type="button" @click="toogleShowNewPasswordRepeate">
                        <span class="icon"><IconEyeClose v-if="showNewPasswordRepeate" /><IconEyeOpen v-else /></span>
                    </button>
                </div>
                <p v-if="missingNewPasswordRepeate" class="invalid-text">{{ lg('missing_password_repeate') }}</p>
                <p v-if="mismatchNewPassword" class="invalid-text">{{ lg('password_repeate_not_match') }}</p>
            </div>

            <div class="mt-1 mb-1">
                <label for="password_input">{{ lg('current_password') }} <span>*</span></label>
                <div class="password-container">
                    <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="password" @input="clearErrors" :disabled="submitting">
                    <button type="button" @click="toogleShowPassword">
                        <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                    </button>
                </div>
                <p v-if="missingPassword" class="invalid-text">{{ lg('missing_password') }}</p>
            </div>
        </div>
        <div class="profile-updates-btns">
            <button type="button" class="btn btn-secondary" @click="cancel" :disabled="submitting">{{ lg('cancel') }}</button>
            <button type="button" class="btn btn-primary" @click="save" :disabled="submitting">{{ lg('save') }}</button>
        </div>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { userStore } from '@/stores/user';
    import { useLgStore } from '@/stores/active__lg';
    import IconEyeClose from '@/components/icons/IconEyeClose.vue';
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';

    export default {
        components: {
            IconEyeClose,
            IconEyeOpen,
        },
        data() {
            return {
                submitting:false,
                newPassword: '',
                showNewPassword: false,
                missingNewPassword: false,
                newPasswordRepeate: '',
                showNewPasswordRepeate: false,
                missingNewPasswordRepeate: false,
                mismatchNewPassword: false,
                password: '',
                missingPassword: false,
                showPassword: false,
            }
        },

        computed: {
            ...mapStores(userStore),
            ...mapState(useLgStore, ['lg']),

            newPasswordInputType() {
                return this.showNewPassword ? 'text' : 'password';
            },

            repeateNewPasswordInputType() {
                return this.showNewPasswordRepeate ? 'text' : 'password';
            },

            passwordInputType() {
                return this.showPassword ? 'text' : 'password';
            },
        },

        methods: {
            save() {
                if (this.validateFields()) {
                    return;
                }
                this.submitting = true;
                let payload = {
                    newPassword: this.newPassword,
                    oldPassword: this.password
                }
                this.$emit('startLoading');
                this.userStore.updateUser(payload)
                    .then(() => {
                        this.submitting = false;
                        this.$emit('finishLoading');
                        this.$emit('success');
                    })
                    .catch((e) => {
                        this.submitting = false;
                        this.$emit('finishLoading');
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.missingNewPassword = true;
                            this.missingNewPasswordRepeate = true;
                            this.missingPassword = true;
                            this.newPasswordRepeate = '';
                            this.password = '';
                            document.getElementById("new_password_input").focus();
                        }
                    });
            },

            cancel() {
                this.$emit('cancel');
            },

            validateFields() {
                if (this.newPassword.trim().length < 6) {
                    this.missingNewPassword = true;
                    this.newPasswordRepeate = '';
                    this.password = '';
                    document.getElementById("new_password_input").focus();
                    return true;
                }

                if (this.newPasswordRepeate.trim().length < 6) {
                    this.missingNewPasswordRepeate = true;
                    this.password = '';
                    document.getElementById("new_password_repeate").focus();
                    return true;
                }

                if (this.newPassword.trim() !== this.newPasswordRepeate.trim()) {
                    this.mismatchNewPassword = true;
                    this.showNewPassword = true;
                    this.showNewPasswordRepeate = true;
                    this.password = '';
                    document.getElementById("new_password_repeate").focus();
                    return true;
                }

                if (this.password.trim().length < 6) {
                    this.missingPassword = true;
                    this.password = '';
                    document.getElementById("password_input").focus();
                    return true;
                }

                return false;
            },

            clearErrors() {
                this.missingNewPassword = false;
                this.missingNewPasswordRepeate = false;
                this.mismatchNewPassword = false;
                this.missingPassword = false;
            },

            toogleShowNewPassword() {
                this.showNewPassword = !this.showNewPassword;
            },

            toogleShowNewPasswordRepeate() {
                this.showNewPasswordRepeate = !this.showNewPasswordRepeate;
            },

            toogleShowPassword() {
                this.showPassword = !this.showPassword;
            },
        },

        mounted() {
            document.getElementById("new_password_input").focus();
        }
    }
</script>
