<template>
    <div>
        <div class="admin-confirm-card">
            <form novalidate @submit.prevent="submit">
                <div class="mb-1">
                    <label for="password_input">{{ isUpdate ? 'New' : ''}} Password<span>*</span></label>
                    <div class="password-container">
                        <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="password" @input="clearErrors" :disabled="submitting">
                        <button type="button" @click="toogleShowPassword">
                            <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                        </button>
                    </div>
                    <p v-if="missingPassword" class="invalid-text">Noooooooooo</p>
                </div>

                <div class="mb-1">
                    <label for="re_password_input">{{ isUpdate ? 'New' : ''}} Password again<span>*</span></label>
                    <div class="password-container">
                        <input id="re_password_input" :type="rePasswordInputType" :class="{'invalid-input': missingRePassword}" v-model="rePassword" @input="clearErrors" :disabled="submitting">
                        <button type="button" @click="toogleShowRePassword">
                            <span class="icon"><IconEyeClose v-if="showRePassword" /><IconEyeOpen v-else /></span>
                        </button>
                    </div>
                    <p v-if="missingRePassword" class="invalid-text">Noooooooooo</p>
                </div>

                <div class="mb-1" v-if="isUpdate">
                    <label for="confirm_password_input">Old Password<span>*</span></label>
                    <div class="password-container">
                        <input id="confirm_password_input" :type="confirmPasswordInputType" :class="{'invalid-input': missingConfirmPassword}" v-model="confirmPassword" @input="clearErrors" :disabled="submitting">
                        <button type="button" @click="toogleShowConfirmPassword">
                            <span class="icon"><IconEyeClose v-if="showConfirmPassword" /><IconEyeOpen v-else /></span>
                        </button>
                    </div>
                    <p v-if="missingConfirmPassword" class="invalid-text">Noooooooooo</p>
                </div>

                <div class="text-center mb-2 mt-2">
                    <button v-if="isUpdate" type="button" class="btn btn-block btn-secondary" @click="goBack()" :disabled="submitting">Back</button>
                    <button type="submit" class="btn btn-block btn-primary" :disabled="submitting">Confirm</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapStores } from 'pinia';
    import { adminUserStore } from '@/stores/admin_user';
    import IconEyeClose from '@/components/icons/IconEyeClose.vue';
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
    import axios from 'axios';

    export default {
        components: {
            IconEyeClose,
            IconEyeOpen,
        },

        data() {
            return {
                password: '',
                showPassword: false,
                rePassword: '',
                showRePassword: false,
                confirmPassword: '',
                showConfirmPassword: false,
                submitting: false,
                missingPassword: false,
                missingRePassword: false,
                missingConfirmPassword: false,
            };
        },

        computed: {
            ...mapStores(adminUserStore),
            passwordInputType() {
                return this.showPassword ? 'text' : 'password';
            },

            rePasswordInputType() {
                return this.showRePassword ? 'text' : 'password';
            },

            confirmPasswordInputType() {
                return this.showConfirmPassword ? 'text' : 'password';
            },

            isUpdate() {
                return this.adminUserStore.hasUpdatePassword;
            }
        },

        methods: {
            goBack() {
                this.$router.push('/admin');
            },

            clearErrors() {
                this.missingPassword = false;
                this.missingRePassword = false;
                this.missingConfirmPassword = false;
            },

            toogleShowPassword() {
                this.showPassword = !this.showPassword;
            },

            toogleShowRePassword() {
                this.showRePassword = !this.showRePassword;
            },

            toogleShowConfirmPassword() {
                this.showConfirmPassword = !this.showConfirmPassword;
            },

            validateInput() {
                let hasError = false;

                if (this.password.trim() === '') {
                    this.missingPassword = true;
                    if (!hasError) {
                        document.getElementById('password_input').focus();
                        hasError = true;
                    }
                }

                if (this.rePassword.trim() === '' || this.rePassword.trim() != this.password.trim()) {
                    this.missingRePassword = true;
                    if (!hasError) {
                        document.getElementById('re_password_input').focus();
                        hasError = true;
                    }
                }

                if (this.confirmPassword.trim() === '' && this.isUpdate) {
                    this.missingConfirmPassword = true;
                    if (!hasError) {
                        document.getElementById('confirm_password_input').focus();
                        hasError = true;
                    }
                }

                return hasError;
            },

            submit() {
                if (this.submitting) return;
                if (this.validateInput()) {
                    return;
                }

                this.submitting = true;
                let submitData = {
                    password: this.password.trim(),
                    re_password: this.rePassword.trim()
                };

                if (this.isUpdate) {
                    submitData.confirm_password = this.confirmPassword.trim();
                }

                axios.post('/api/admin/admin-password', submitData)
                    .then(() => {
                        this.adminUserStore.hasUpdatePassword = true;
                        this.$router.push('/admin');
                    })
                    .catch(() => {
                        this.submitting = false;
                        this.password = '';
                        this.rePassword = '';
                        this.confirmPassword = '';
                        this.missingPassword = true;
                        this.missingRePassword = true;
                        this.missingConfirmPassword = true;
                        document.getElementById('password_input').focus();
                    });
            },
        },
    }
</script>