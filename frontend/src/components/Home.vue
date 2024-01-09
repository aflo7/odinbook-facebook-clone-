<script setup>
import { store } from '../store';
import axios from 'axios';
import '../css/Home.css';
import router from '../router';


const logout = () => {
  store.loggedIn = false;
  localStorage.removeItem('token');
  router.push("/")
};

const createPost = () => {
  axios
    .post(
      'http://localhost:4000/api/create-post',
      {
        token: localStorage.getItem('token'),
        title: store.mindTitle,
        content: store.mindText
      },
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    .then((response) => {
      store.mindTitle = '';
      store.mindText = '';
      console.log(response.data);
      store.posts.unshift(response.data);
    })
    .catch((error) => {
      store.mindTitle = '';
      store.mindText = '';
      console.log(error);
    });
};

const getThePosts = () => {
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
      store.posts = response.data.posts;
    })
    .catch((error) => {
      console.log(error);
    });
};


getThePosts();
</script>

<template>
  <div>
    <nav>
      <div style="display: flex; align-items: center; gap: 10px">
        <img src="../assets/odinlogo2.jpeg" height="50px" />
      </div>
      <form @submit.prevent="logout">
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
                v-model="store.mindTitle"
              />

              <input
                class="mindTextBox"
                type="text"
                placeholder="Enter content"
                v-model="store.mindText"
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

        <div
          v-if="store.posts && store.posts.length > 0"
        >
          <div
            v-for="(post, index) in store.posts"
            :key="index"
            class="post"
          >
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
</template>

<style scoped></style>
