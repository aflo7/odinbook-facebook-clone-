<script setup>
import { store } from '../store';
import axios from 'axios';

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
</script>

<template>
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
      <button type="submit" class="submit-btn">Submit</button>
    </form>
    <hr />
    <div class="mindWrapperBottom">
      <div>Live video</div>
      <div>Photo/video</div>
      <div>Feeling/activity</div>
    </div>
  </div>

  <div v-if="store.posts && store.posts.length > 0">
    <div v-for="(post, index) in store.posts" :key="index" class="post">
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
</template>

<style scoped>
.submit-btn {
  background-color: lightgreen;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

.submit-btn:hover {
  background-color: rgb(103, 208, 103);
}

main {
  overflow: hidden;
}

.postSubmitFormWrapper {
  border-radius: 5px;
  flex: 1;
  border: none;
  padding: 10px;
}

.mindTextBox {
  border-radius: 5px;
  background-color: rgb(240, 242, 245);
  border: none;
  padding: 10px;
}

.mindWrapperTop {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mindWrapperBottom {
  display: flex;
}

.mindWrapperBottom > div {
  flex: 1;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
}

hr {
  border: none;
  height: 1px;
  background-color: lightgray;
}

.mindWrapperBottom > div:hover {
  cursor: pointer;
  background-color: rgb(240, 242, 245);
}

.mindWrapper {
  padding: 15px;
  margin: 20px 0px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
}

.post {
  margin: 20px 0px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
}

@media screen and (min-width: 700px) {
  .mindWrapper,
  .post {
    border-radius: 5px;
  }
}
</style>
