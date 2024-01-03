<script setup>
import axios from 'axios';
import './css/styles.css';
import './css/App.css';
</script>

<template>
  <div v-if="loggedIn">
    <nav>
      <div style="display: flex; align-items: center; gap: 10px">
        <img src="./assets/odinlogo2.jpeg" height="40px" />
        <div>Odinbook</div>
      </div>
      <form @submit.prevent="logout()">
        <button type="submit">Logout</button>
      </form>
    </nav>
    <div class="main-wrapper">
      <main>
        <div class="mindWrapper">
          <div class="mindWrapperTop">
            <div>PFP</div>
            <input
              class="mindTextBox"
              type="text"
              placeholder="What's on your mind, Andres?"
            />
          </div>
          <hr />
          <div class="mindWrapperBottom">
            <div>Live video</div>
            <div>Photo/video</div>
            <div>Feeling/activity</div>
          </div>
        </div>

        <div v-if="posts && posts.length > 0">
          <div v-for="(post, index) in posts" :key="index" class="post">
            <div>
              {{ post.content }}
            </div>
            <div>
              {{ post.posterName }}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  <form
    v-else
    @submit.prevent="login"
    style="display: flex; flex-direction: column; gap: 10px; margin: 20px"
  >
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
      password: '',
      loggedIn: false,
      posts: null
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:4000/api/login', {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          this.username = '';
          this.password = '';
          this.loggedIn = true;
          localStorage.setItem('token', response.data.token);

          this.getPosts();
        })
        .catch((error) => {
          this.username = '';
          this.password = '';
          console.log(error);
        });
    },

    logout() {
      this.loggedIn = false;
      localStorage.removeItem('token');
    },
    getPosts() {
      axios
        .post(
          'http://localhost:4000/api/home',
          {
            token: localStorage.getItem('token')
          },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          console.log(response);
          this.posts = response.data.posts;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
