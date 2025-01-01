<template>
  <div class="welcome-wrapper">
    <header class="welcome-register">
      <div class="menu-box">
        <RouterLink to="/register" class="mr-2 menu--item"><span class="icon"><IconTerms /></span> Terms</RouterLink>
        <RouterLink to="/register" class="menu--item"><span class="icon"><IconShield /></span> Privacy</RouterLink>
      </div>
      <div class="menu-box">
        <RouterLink to="/register" class="menu--item mr-2"><span class="icon"><IconIdCard /></span> Register</RouterLink>
        <LgSelector class="menu--item" />
        
      </div>
    </header>
    <h1 class="text-center m-2">Login</h1>
    <main>
      <div class="card">
        <form novalidate @submit.prevent="submit">
          <label for="username_input">Username <span>*</span></label>
          <input id="username_input" type="text" v-model="username">
          <div>
            <div>
              <label for="password_input">Password<span>*</span></label>
              <input id="password_input" :type="passwordInputType" v-model="password">
            </div>
            <div>
              <button type="button" @click="toogleShowPassword">
                <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
              </button>
            </div>
          </div>
          
          <button type="submit">Login</button>
        </form>
        <p>
          No account yet? <RouterLink to="/register">Register</RouterLink>
        </p>
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
      showPassword: false,
      lgSelectOpen: false,
    };
  },

  computed: {
    passwordInputType() {
      return this.showPassword ? 'text' : 'password';
    }
  },

  methods: {
    submit() {

    },

    toogleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },

  mounted() {
    console.log('Welcome Mounted!!!');
    console.log(this.socket);
  }
}
</script>
