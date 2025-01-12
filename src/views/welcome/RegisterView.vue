<template>
    <div class="welcome-wrapper">
        <header class="welcome-register">
            <div class="menu-box">
                <RouterLink to="/terms" class="mr-2 menu-item"><span class="icon"><IconTerms /></span> {{ lg('terms') }}</RouterLink>
                <RouterLink to="/privacy" class="menu-item"><span class="icon"><IconShield /></span> {{ lg('privacy') }}</RouterLink>
            </div>
            <div class="menu-box">
                <RouterLink to="/" class="menu-item mr-2"><span class="icon"><IconUser /></span> {{ lg('login') }}</RouterLink>
                <LgSelector class="menu-item" />
                
            </div>
        </header>

        <h1 class="text-center m-2">{{ lg('register') }}</h1>

        <main>
            <div class="card">

                <form novalidate @submit.prevent="submit">
                    <label for="username_input">{{ lg('username') }} <span>*</span></label>
                    <input id="username_input" type="text" :class="{'invalid-input': (missingUsername || invalidUser)}" v-model="registerStore.username" @input="clearErrors" @blur="checkUsername" :disabled="submitting">
                    <p v-if="missingUsername" class="invalid-text">{{ lg('missing_username') }}</p>
                    <p v-if="invalidUser" class="invalid-text">{{ lg('username_exists') }}</p>

                    <div>
                        <label for="password_input">{{ lg('password') }} <span>*</span></label>
                        <div class="password-container">
                            <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="registerStore.password" @input="clearErrors" :disabled="submitting">
                            <button type="button" @click="toogleShowPassword">
                                <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                            </button>
                        </div>
                        <p v-if="missingPassword" class="invalid-text">{{ lg('missing_password') }}</p>
                    </div>

                    <div>
                        <label for="password_repeate">{{ lg('password_repeate') }} <span>*</span></label>
                        <div class="password-container">
                            <input id="password_repeate" :type="passwordRepeateInputType" :class="{'invalid-input': (missingPasswordRepeate || passwordRepeateNotMatch)}" v-model="passwordRepeate" @input="clearErrors" :disabled="submitting">
                            <button type="button" @click="toogleShowPasswordRepeate">
                                <span class="icon"><IconEyeClose v-if="showPasswordRepeate" /><IconEyeOpen v-else /></span>
                            </button>
                        </div>
                        <p v-if="missingPasswordRepeate" class="invalid-text">{{ lg('missing_password_repeate') }}</p>
                        <p v-if="passwordRepeateNotMatch" class="invalid-text">{{ lg('password_repeate_not_match') }}</p>
                    </div>

                    <div class="simple-checkbox">
                        <label for="accept_terms">
                            <input type="checkbox" id="accept_terms" v-model="registerStore.acceptTerms" :class="{'invalid-input': termsNotAccepted}" @change="clearErrors" :disabled="submitting"> {{ lg('accept_terms') }} <span>*</span>
                        </label>
                    </div>
                    <p v-if="termsNotAccepted" class="invalid-text pb-1">{{ lg('terms_not_accepted') }}<RouterLink to="/terms" class="ml-1">{{ lg('terms') }}</RouterLink></p>

                    <input type="text" class="hidden-input" v-model="hpot">

                    <div class="text-center mb-2">
                        <button type="submit" class="btn-primary" :disabled="submitting">{{ lg('register') }}</button>
                        <p v-if="generalError" class="invalid-text">{{ lg('general_error') }}</p>
                    </div>
                </form>
                
            </div>
        </main>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import IconUser from '@/components/icons/IconUser.vue';
import IconTerms from '@/components/icons/IconTerms.vue';
import IconShield from '@/components/icons/IconShield.vue';
import IconEyeClose from '@/components/icons/IconEyeClose.vue';
import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
import LgSelector from '@/components/LgSelector.vue';
import { mapState, mapStores } from 'pinia';
import { useLgStore } from '@/stores/active__lg';
import { registerStore } from '@/stores/register';
import axios from 'axios';

export default {
    components: {
        RouterLink,
        IconUser,
        IconTerms,
        IconShield,
        IconEyeClose,
        IconEyeOpen,
        LgSelector,
    },

    data() {
        return {
            passwordRepeate: '',
            showPassword: false,
            showPasswordRepeate: false,
            submitting: false,
            missingUsername: false,
            missingPassword: false,
            invalidUser: false,
            missingPasswordRepeate: false,
            passwordRepeateNotMatch: false,
            termsNotAccepted: false,
            generalError: false,
            hpot: '',
        };
    },

    computed: {
        ...mapStores(registerStore),

        ...mapState(useLgStore, ['lg']),

        passwordInputType() {
            return this.showPassword ? 'text' : 'password';
        },

        passwordRepeateInputType() {
            return this.showPasswordRepeate ? 'text' : 'password';
        },
    },

    methods: {
        submit() {
            if (this.submitting) {
                return;
            }

            if (this.validateInput()) {
                return;
            }

            this.generalError = false;
            this.submitting = true;

            let lg = 'HU';
            try {
                lg = localStorage.getItem('y_chat_selected_lg');
            } catch (error) {
                console.log(error);
            }

            axios.post('/api/register', {
                username: this.registerStore.username.trim(),
                password: this.registerStore.password.trim(),
                acceptTerms: this.registerStore.acceptTerms,
                lg: lg,
                hpot: this.hpot,
            })
            .then(() => {
                this.submitting = false;
                this.registerStore.username = '';
                this.registerStore.password = '';
                this.registerStore.acceptTerms = false;
                this.$router.push('/home/profile');
            })
            .catch((e) => {
                this.submitting = false;
                let msg = e?.response?.data?.message;

                if (msg === 'username') {
                    this.missingUsername = true;
                    document.getElementById('username_input').focus();
                    return;
                }

                if (msg === 'password') {
                    this.missingPassword = true;
                    document.getElementById('password_input').focus();
                    return;
                }

                if (msg === 'terms') {
                    this.termsNotAccepted = true;
                    return;
                }

                if (msg === 'invalid_username') {
                    this.invalidUser = true;
                    document.getElementById('username_input').focus();
                    return;
                }

                if (msg === 'pot') {
                    //it's a robot, let block it for a 5sec
                    this.generalError = true;
                    this.submitting = true;
                    this.hpot = '';
                    setTimeout(() => {
                        this.generalError = false;
                        this.submitting = false;
                    }, 5000);
                    return;
                }

                //Hm something other problem
                this.generalError = true;
                setTimeout(() => {
                    this.generalError = false;
                }, 3000);
            })
        },

        toogleShowPassword() {
            this.showPassword = !this.showPassword;
        },

        toogleShowPasswordRepeate() {
            this.showPasswordRepeate = !this.showPasswordRepeate;
        },

        clearErrors() {
            this.missingUsername = false;
            this.missingPassword = false;
            this.invalidUser = false;
            this.missingPasswordRepeate = false;
            this.passwordRepeateNotMatch = false;
            this.termsNotAccepted = false;
        },

        validateInput() {
            let hasError = false;

            if (this.invalidUser) {
                let nameInput = document.getElementById('username_input');
                nameInput.focus();
                nameInput.select();
                hasError = true;
            }

            if (this.registerStore.username.trim() === '') {
                this.missingUsername = true;
                document.getElementById('username_input').focus();
                hasError = true;
            }

            if (this.registerStore.password.trim() === '') {
                this.missingPassword = true;
                if (!hasError) {
                    document.getElementById('password_input').focus();
                    hasError = true;
                }
            }

            if (this.passwordRepeate.trim() === '') {
                this.missingPasswordRepeate = true;
                if (!hasError) {
                    document.getElementById('password_repeate').focus();
                    hasError = true;
                }
            }

            if ((this.registerStore.password && this.passwordRepeate) && this.passwordRepeate !== this.registerStore.password) {
                this.passwordRepeateNotMatch = true;
                if (!hasError) {
                    let repeateField = document.getElementById('password_repeate');
                    repeateField.focus();
                    repeateField.select();
                    hasError = true;
                }
                setTimeout(() => {
                    this.showPassword = true;
                    this.showPasswordRepeate = true;
                }, 100);
                
            }

            if (!this.registerStore.acceptTerms) {
                this.termsNotAccepted = true;
                hasError = true;
            }

            return hasError;
        },

        checkUsername() {
            if (this.registerStore.username.trim() === '') return;
            axios.post('/api/username-check', { username: this.registerStore.username.trim() })
                .catch((e) => {
                    console.log(e);
                    this.invalidUser = true;
                })
        },
    },
}
</script>
