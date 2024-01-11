<script setup>
import { store } from '../store';
import axios from 'axios';
import '../css/Home.css';
import router from '../router';
import { IoHome } from 'react-icons/io5';
import { IoNewspaperSharp } from 'react-icons/io5';
import newsPaperSvg from '../assets/Newspaper.svg';
import Posts from './Posts.vue';
import News from './News.vue';

const logout = () => {
  store.loggedIn = false;
  localStorage.removeItem('token');
  router.push('/');
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
      // console.log(response.data.appleArticles);
      // console.log(response.data.chatGptArticles);

      store.posts = response.data.posts;
      store.appleArticles = response.data.appleArticles.articles;
      store.chatArticles = response.data.chatGptArticles.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeSelectedTab = (tab) => {
  store.selectedTab = tab;
};

getThePosts();
</script>

<template>
  <div>
    <nav>
      <div style="display: flex; align-items: center;">
        <img src="../assets/odinlogo2.gif" height="40px" />
      </div>
      <div class="tab-wrapper">
        <div
          v-if="store.selectedTab === 'home'"
          style="border-bottom: 2px solid black"
        >
          <!-- <img src="../assets/Home.svg" height="40px" />
           -->
          Home
        </div>

        <div v-else @click="changeSelectedTab('home')">
          <!-- <img src="../assets/Home.svg" height="40px" /> -->
          Home
        </div>
        <div
          v-if="store.selectedTab === 'news'"
          style="border-bottom: 2px solid black"
        >
          <!-- <img src="../assets/Newspaper.svg" height="40px" /> -->
          News
        </div>
        <div v-else @click="changeSelectedTab('news')">
          <!-- <img src="../assets/Newspaper.svg" height="40px" /> -->
          News
        </div>
      </div>
      <form @submit.prevent="logout">
        <button type="submit" class="logout-btn">Logout</button>
      </form>
    </nav>
    <div class="main-wrapper">
      <main>
        <Posts v-if="store.selectedTab === 'home'" />
        <News v-else />
      </main>
    </div>
  </div>
</template>

<style scoped>
.logout-btn {
  background-color: rgb(238, 144, 144);
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: black;
}

.logout-btn:hover {
  background-color: rgb(208, 127, 127);
}
</style>
