<template>
  <div class="welcome-wrapper">
    <header class="welcome-register">
      <div class="menu-box">
        <RouterLink to="/terms" class="mr-2 menu--item"><span class="icon"><IconTerms /></span> {{ lg('terms') }}</RouterLink>
        <RouterLink to="/privacy" class="menu--item"><span class="icon"><IconShield /></span> {{ lg('privacy') }}</RouterLink>
      </div>
      <div class="menu-box">
        <RouterLink to="/" class="menu--item mr-2"><span class="icon"><IconUser /></span> {{ lg('login') }}</RouterLink>
        <LgSelector class="menu--item" />
        
      </div>
    </header>
    <h1 class="text-center m-2">{{ lg('register') }}</h1>
    <main>
      <div class="card">
        <form novalidate @submit.prevent="submit">
          <label for="username_input">{{ lg('username') }} <span>*</span></label>
          <input id="username_input" type="text" :class="{'invalid-input': (missingUsername || invalidUser)}" v-model="username" @input="clearErrors" @blur="checkUsername">
          <p v-if="missingUsername" class="invalid-text">{{ lg('missing_username') }}</p>
          <p v-if="invalidUser" class="invalid-text">{{ lg('username_exists') }}</p>

          <div>
            <label for="password_input">{{ lg('password') }} <span>*</span></label>
            <div class="password-container">
              <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="password" @input="clearErrors">
              <button type="button" @click="toogleShowPassword">
                <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
              </button>
            </div>
            <p v-if="missingPassword" class="invalid-text">{{ lg('missing_password') }}</p>
          </div>

          <div>
            <label for="password_repeate">{{ lg('password_repeate') }} <span>*</span></label>
            <div class="password-container">
              <input id="password_repeate" :type="passwordRepeateInputType" :class="{'invalid-input': (missingPasswordRepeate || passwordRepeateNotMatch)}" v-model="passwordRepeate" @input="clearErrors">
              <button type="button" @click="toogleShowPasswordRepeate">
                <span class="icon"><IconEyeClose v-if="showPasswordRepeate" /><IconEyeOpen v-else /></span>
              </button>
            </div>
            <p v-if="missingPasswordRepeate" class="invalid-text">{{ lg('missing_password_repeate') }}</p>
            <p v-if="passwordRepeateNotMatch" class="invalid-text">{{ lg('password_repeate_not_match') }}</p>
          </div>

          <div class="simple-checkbox">
            <label for="accept_terms">
              <input type="checkbox" id="accept_terms" v-model="acceptTerms" :class="{'invalid-input': termsNotAccepted}" @change="clearErrors"> {{ lg('accept_terms') }} <span>*</span>
            </label>
          </div>
          <p v-if="termsNotAccepted" class="invalid-text pb-1">{{ lg('terms_not_accepted') }}<RouterLink to="/terms" class="ml-1">{{ lg('terms') }}</RouterLink></p>
          <div class="text-center mb-2">
            <button type="submit" class="btn-primary" :disabled="submitting">{{ lg('register') }}</button>
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
import { mapState } from 'pinia';
import { useLgStore } from '@/stores/active__lg';
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
  props: ['socket'],

  data() {
    return {
      username: '',
      password: '',
      passwordRepeate: '',
      acceptTerms: false,
      showPassword: false,
      showPasswordRepeate: false,
      submitting: false,
      missingUsername: false,
      missingPassword: false,
      invalidUser: false,
      missingPasswordRepeate: false,
      passwordRepeateNotMatch: false,
      termsNotAccepted: false,
    };
  },

  computed: {
    ...mapState(useLgStore,
      ['lg']
    ),
    passwordInputType() {
      return this.showPassword ? 'text' : 'password';
    },
    passwordRepeateInputType() {
      return this.showPasswordRepeate ? 'text' : 'password';
    }
  },

  methods: {
    submit() {
      if (this.validateInput()) {
        return;
      }
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

      if (this.passwordRepeate.trim() === '') {
        this.missingPasswordRepeate = true;
        if (!hasError) {
          document.getElementById('password_repeate').focus();
          hasError = true;
        }
      }

      if ((this.password && this.passwordRepeate) && this.passwordRepeate !== this.password) {
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

      if (!this.acceptTerms) {
        this.termsNotAccepted = true;
        hasError = true;
      }

      return hasError;
    },

    checkUsername() {
      if (this.username.trim() === '') return;
      axios.post('/username-check', {username: this.username.trim()})
            .catch((e) => {
              console.log(e);
              this.invalidUser = true;
            })
    },
  },

  mounted() {
    
  }
}
</script>
