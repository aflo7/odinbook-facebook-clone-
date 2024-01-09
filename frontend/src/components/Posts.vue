<script setup>
import { store } from '../store';
</script>

<template>
  Posts

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

<style scoped></style>
