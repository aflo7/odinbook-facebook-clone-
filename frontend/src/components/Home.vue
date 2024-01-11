<script setup>
import { store } from '../store';
import axios from 'axios';
import router from '../router';
import Posts from './Posts.vue';
import News from './News.vue';

const logout = () => {
  store.loggedIn = false;
  localStorage.removeItem('token');
  router.push('/');
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
console.log(store.loggedInUserName);
</script>

<template>
  <div>
    <nav>
      <!-- <div class="odinbook-text-wrapper" style="display: flex; align-items: center;"> -->
      <div class="odinbook-text-wrapper">
        <!-- <img src="../assets/odinlogo2.gif" height="40px" /> -->
        Odinbook
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
      <form
        @submit.prevent="logout"
        style="display: flex; align-items: center; gap: 10px"
      >
        <div class="logged-in-user-name-wrapper">
          {{ store.loggedInUserName }}
        </div>
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

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  background-color: rgb(65, 127, 228);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  color: white;
}

.tab-wrapper {
  display: flex;
}

.tab-wrapper > div {
  padding: 10px 40px;
  border-bottom: 2px solid rgb(65, 127, 228);
  cursor: pointer;
}

.logged-in-user-name-wrapper {
  display: none;
}

.odinbook-text-wrapper {
  display: none;
}

@media screen and (min-width: 700px) {
  main {
    max-width: 1000px;
    margin: 0 auto;
    padding-left: 5px;
    padding-right: 5px;
  }

  .logged-in-user-name-wrapper {
    display: block;
  }

  .odinbook-text-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
