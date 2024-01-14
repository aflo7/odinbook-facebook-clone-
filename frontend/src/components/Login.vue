<script setup>
import { store } from '../store';
import router from '../router';
import axios from 'axios';

function login() {
  store.loggedIn = true;
  axios
    .post('http://localhost:4000/api/login', {
      username: store.username,
      password: store.password
    })
    .then((response) => {
      store.username = '';
      store.password = '';
      store.loggedIn = true;
      store.loggedInUserName = response.data.user;
      localStorage.setItem('token', response.data.token);
      router.push('/home');
    })
    .catch((error) => {
      store.username = '';
      store.password = '';
      alert(error);
    });
}
</script>

<template>
  <div class="outer">

  <div class="login-form-wrapper">
    <div style="display: flex; flex-direction: column; color: white; padding: 10px;">
      <!-- <img src="../assets/odinlogo2.jpeg" style="height: 50px" /> -->
      <h1>odinbook</h1>
      <p>Connect with friends and the world around you on Facebook.</p>
    </div>

    <form class="login-form" @submit.prevent="login">
      <input
        style="
          padding: 10px;
          border-radius: 5px;
          border: none;
          background-color: rgb(240, 242, 245);
        "
        type="text"
        placeholder="Username"
        v-model="store.username"
      />
      <input
        style="
          padding: 10px;
          border-radius: 5px;
          border: none;
          background-color: rgb(240, 242, 245);
        "
        type="password"
        placeholder="Password"
        v-model="store.password"
      />
      <button type="submit" class="login-btn">Login</button>
    </form>
  </div>

</div>
</template>

<style scoped>

.outer {
  background-color: rgb(65, 127, 228);
  height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 100px;


}

h1 {
  margin: 0;
  font-weight: normal;
}
.login-btn {
  background-color: lightgreen;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

.login-btn:hover {
  background-color: rgb(103, 208, 103);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  padding: 10px;
  border-radius: 5px;
}

.login-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  max-width: 600px;
}





</style>

<script>
export default {
  mounted() {
    this.checkToken();
  },

  methods: {
    checkToken() {
      const theToken = localStorage.getItem('token');
      if (theToken) {
        axios
          .get('http://localhost:4000/api/protected-resource', {
            headers: { Authorization: theToken }
          })
          .then(function (response) {
            console.log(response);
            store.loggedIn = true;
            router.push('/home');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
