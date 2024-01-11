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
  <div class="login-form-wrapper">
    <div style="display: flex; align-items: center; gap: 10px">
      <img src="../assets/odinlogo2.jpeg" style="height: 60px" />
      <h1>Odinbook</h1>
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
</template>

<style scoped>
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
  width: 100%;
}

.login-form-wrapper {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
}
</style>
