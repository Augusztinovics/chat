<template>
    <div>
        <div class="admin-confirm-card">
            <form novalidate @submit.prevent="submit">
                <div>
                    <label for="password_input">Confirm your user password<span>*</span> <b>-{{ tryCounter }}</b></label>
                    <div class="password-container">
                        <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="password" @input="clearErrors" :disabled="submitting">
                        <button type="button" @click="toogleShowPassword">
                            <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                        </button>
                    </div>
                    <p v-if="missingPassword" class="invalid-text">Noooooooooo</p>
                </div>
                <input type="text" class="hidden-input" v-model="hpot">

                <div class="text-center mb-2">
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
                submitting: false,
                missingPassword: false,
                hpot: '',
                tryCounter: 1,
            };
        },

        computed: {
            ...mapStores(adminUserStore),
            passwordInputType() {
                return this.showPassword ? 'text' : 'password';
            },
        },

        methods: {
            clearErrors() {
                this.missingPassword = false;
            },

            toogleShowPassword() {
                this.showPassword = !this.showPassword;
            },

            submit() {
                if (this.submitting) return;
                this.submitting = true;
                this.tryCounter++;

                if (this.hpot || this.tryCounter > 3) {
                    this.$router.push('/login');
                    return;
                }

                if (this.password.trim() === '') {
                    this.submitting = false;
                    this.missingPassword = true;
                    document.getElementById('password_input').focus();
                    return;
                }

                axios.post('/api/admin/admin-confirm', {password: this.password.trim()})
                    .then(() => {
                        this.adminUserStore.confirmed = true;
                        this.$router.push('/admin');
                    })
                    .catch(() => {
                        this.submitting = false;
                        this.missingPassword = true;
                        document.getElementById('password_input').focus();
                    });
            },
        },

        mounted() {
             setTimeout(() => {
                document.getElementById('password_input').focus();
            }, 300);
        },
    }
</script>