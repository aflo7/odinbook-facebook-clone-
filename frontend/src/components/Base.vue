<script setup>
import axios from 'axios';
import '../css/Base.css';
</script>

<template>
  <div class="loading-screen-wrapper" v-if="isLoading">
    <div>
      <img src="../assets/odinlogo2.jpeg" height="80px" />
      <div>Loading...</div>
    </div>
  </div>
  <div v-else>
    <div v-if="loggedIn">
      <nav>
        <div style="display: flex; align-items: center; gap: 10px">
          <img src="../assets/odinlogo2.jpeg" height="50px" />
        </div>
        <form @submit.prevent="logout()">
          <button type="submit">Logout</button>
        </form>
      </nav>
      <div class="main-wrapper">
        <main>
          <div class="mindWrapper">
            <form class="mindWrapperTop" @submit.prevent="createPost">
              <div
                class="postSubmitFormWrapper"
                style="display: flex; flex-direction: column; gap: 10px"
              >
                <input
                  class="mindTextBox"
                  type="text"
                  placeholder="Enter title"
                  v-model="mindTitle"
                />

                <input
                  class="mindTextBox"
                  type="text"
                  placeholder="Enter content"
                  v-model="mindText"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
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
              <div>
                {{ new Date(post.date).toLocaleString('en-US') }}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div v-else style="background-color: white" class="login-form-wrapper">
      <div style="display: flex; align-items: center; gap: 10px">
        <img src="../assets/odinlogo2.jpeg" style="height: 80px" />
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
          v-model="username"
        />
        <input
          style="
            padding: 10px;
            border-radius: 5px;
            border: none;
            background-color: rgb(240, 242, 245);
          "
          type="text"
          placeholder="Password"
          v-model="password"
        />
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      mindTitle: '',
      mindText: '',
      loggedIn: false,
      posts: [],
      isLoading: true
    };
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.login();
    } else {
      this.isLoading = false;
    }
  },
  methods: {
    createPost() {
      axios
        .post(
          'http://localhost:4000/api/create-post',
          {
            token: localStorage.getItem('token'),
            title: this.mindTitle,
            content: this.mindText
          },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          this.mindTitle = '';
          this.mindText = '';
          console.log(response.data);
          this.posts.unshift(response.data);
        })
        .catch((error) => {
          this.mindTitle = '';
          this.mindText = '';
          console.log(error);
        });
    },
    login() {
      this.isLoading = true;
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
          console.log(response);
          this.getPosts();
        })
        .catch((error) => {
          this.username = '';
          this.password = '';
          this.isLoading = false;

          console.log(error);
        });
    },

    logout() {
      this.username = '';
      this.password = '';
      this.loggedIn = false;
      localStorage.removeItem('token');
    },
    getPosts() {
      axios
        .get(
          'http://localhost:4000/api/home',

          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        )
        .then((response) => {
          console.log(response);
          this.posts = response.data.posts;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.loading-screen-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
 
}

.loading-screen-wrapper > div {
  display: flex;
  align-items: center;
  gap: 10px;

  
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.login-form-wrapper {
  padding: 20px;
  margin: 20px;
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
