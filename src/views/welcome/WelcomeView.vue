<template>
  <div class="welcome-wrapper">
    <header class="welcome-register">
      <RouterLink to="/register">Register</RouterLink>
    </header>
    <main>
      <div class="card">
        <form novalidate @submit.prevent="submit">
          <label for="username_input">Username*</label>
          <input id="username_input" type="text" class="form-input" v-model="username">
          <label for="password_input">Password*</label>
          <input id="password_input" type="text" class="form-input" v-model="password">
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
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink,
  },
  props: ['socket'],

  data() {
    return {
      username: '',
      password: '',
    };
  },

  computed: {

  },

  methods: {
    submit() {

    }
  },

  mounted() {
    console.log('Welcome Mounted!!!');
    console.log(this.socket);
  }
}
</script>
