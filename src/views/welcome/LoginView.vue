<template>
    <div class="welcome-wrapper">

        <header class="welcome-register">
            <div class="menu-box">
                <RouterLink to="/terms" class="mr-2 menu-item"><span class="icon"><IconTerms /></span> {{ lg('terms') }}</RouterLink>
                <RouterLink to="/privacy" class="menu-item"><span class="icon"><IconShield /></span> {{ lg('privacy') }}</RouterLink>
            </div>
            <div class="menu-box">
                <RouterLink to="/register" class="menu-item mr-2"><span class="icon"><IconIdCard /></span> {{ lg('register') }}</RouterLink>
                <LgSelector class="menu-item" />
            </div>
        </header>

        <h1 class="text-center m-2">{{ lg('login') }}</h1>

        <main>
            <div class="card">

                <form novalidate @submit.prevent="submit">
                    <label for="username_input">{{ lg('username') }} <span>*</span></label>
                    <input id="username_input" type="text" :class="{'invalid-input': (missingUsername || invalidUser)}" v-model="username" @input="clearErrors" :disabled="submitting">
                    <p v-if="missingUsername" class="invalid-text">{{ lg('missing_username') }}</p>
                    <p v-if="invalidUser" class="invalid-text">{{ lg('invalid_user') }}</p>

                    <div>
                        <label for="password_input">{{ lg('password') }} <span>*</span></label>
                        <div class="password-container">
                            <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="password" @input="clearErrors" :disabled="submitting">
                            <button type="button" @click="toogleShowPassword">
                                <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                            </button>
                        </div>
                        <p v-if="missingPassword" class="invalid-text">{{ lg('missing_password') }}</p>
                    </div>

                    <div class="simple-checkbox">
                        <label for="remember_me">
                            <input type="checkbox" id="remember_me" v-model="rememberMe" :disabled="submitting"> {{ lg('remember_me') }}
                        </label>
                    </div>

                    <input type="text" class="hidden-input" v-model="hpot">

                    <div class="text-center mb-2">
                        <button type="submit" class="btn-primary" :disabled="submitting">{{ lg('login') }}</button>
                    </div>
                </form>

                <p>{{ lg('no_account_yet') }} <RouterLink to="/register"> {{ lg('register') }}</RouterLink></p>

            </div>
        </main>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import IconIdCard from '@/components/icons/IconIdCard.vue';
import IconTerms from '@/components/icons/IconTerms.vue';
import IconShield from '@/components/icons/IconShield.vue';
import IconEyeClose from '@/components/icons/IconEyeClose.vue';
import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
import LgSelector from '@/components/LgSelector.vue';
import { mapState } from 'pinia';
import { useLgStore } from '@/stores/active__lg';
import axios from 'axios';

export default {
    components: {
        RouterLink,
        IconIdCard,
        IconTerms,
        IconShield,
        IconEyeClose,
        IconEyeOpen,
        LgSelector,
    },
    props: ['socket'],

    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
            showPassword: false,
            submitting: false,
            missingUsername: false,
            missingPassword: false,
            invalidUser: false,
            hpot: '',
        };
    },

    computed: {
        ...mapState(useLgStore, ['lg']),

        passwordInputType() {
            return this.showPassword ? 'text' : 'password';
        },
    },

    methods: {
        submit() {
            if (this.validateInput()) {
                return;
            }

            this.submitting = true;
            this.invalidUser = false;

            axios.post('/api/login', {
                username: this.username.trim(),
                password: this.password.trim(),
                rememberMe: this.rememberMe,
                hpot: this.hpot,
            })
            .then(() => {
                this.submitting = false;
                this.$router.push('/home');
            })
            .catch((e) => {
                let msg = e?.response?.data?.message;
                if (msg === 'pot') {
                    //it's a robot, let block it for a 5sec
                    this.invalidUser = true;
                    this.submitting = true;
                    this.password = '';
                    this.username = '';
                    this.rememberMe = false;
                    this.hpot = '';
                    setTimeout(() => {
                        this.submitting = false;
                    }, 5000);
                    return;
                }

                this.submitting = false;
                this.invalidUser = true;
                this.password = '';
                let usname = document.getElementById('username_input');
                usname.focus();
                usname.select();
            });
        },

        toogleShowPassword() {
            this.showPassword = !this.showPassword;
        },

        clearErrors() {
            this.missingUsername = false;
            this.missingPassword = false;
            this.invalidUser = false;
        },

        validateInput() {
            let hasError = false;

            if (this.username.trim() === '') {
                this.missingUsername = true;
                document.getElementById('username_input').focus();
                hasError = true;
            }

            if (this.password.trim() === '') {
                this.missingPassword = true;
                if (!hasError) {
                    document.getElementById('password_input').focus();
                    hasError = true;
                }
            }

            return hasError;
        },
    },

    mounted() {
        
    }
}
</script>
