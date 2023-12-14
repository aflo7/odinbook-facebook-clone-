<script setup>
import axios from 'axios';
import './css/styles.css';
</script>

<template>
  <form @submit.prevent="submit()">
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <button type="submit">Login</button>
  </form>

  <form @submit.prevent="getProtectedResource()" style="border: 2px solid red">
    <button type="submit">Get the protected resource</button>
  </form>

  <form @submit.prevent="logout()">
    <button type="submit">Logout</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submit() {
      axios
        .post('http://localhost:4000/api/login', {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          localStorage.setItem('token', response.data.token);
        })
        .catch(function (error) {
          console.log(error);
          alert('incorrect credentials');
        });
    },
    getProtectedResource() {
      axios
        .get('http://localhost:4000/api/protected-resource', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch((error) => {
          localStorage.removeItem('token');
        });
    },
    logout() {
      localStorage.removeItem('token');
    }
  }
};
</script>
<style scoped>
</style>
