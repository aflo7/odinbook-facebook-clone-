<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
</script>

<template>
  <div v-if="loggedIn">LoggedIn</div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loggedIn: false
    };
  },
  methods: {
    submit() {
      // localStorage.setItem('username', 'this.username');
    }
  }
};
</script>

<style scoped></style>
