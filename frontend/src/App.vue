<script setup>
import axios from 'axios';
</script>

<template>
  <form @submit.prevent="submit()">
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <button type="submit">Login</button>
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
      console.log(this.username, this.password);
      axios
        .post('http://localhost:4000/api/login ', {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped></style>
