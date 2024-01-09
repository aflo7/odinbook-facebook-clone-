<script setup>
import { store } from '../store';

console.log(store.appleArticles);
</script>

<template>

  <div v-if="store.appleArticles && store.appleArticles.length > 0">
    <div
      v-for="(article, index) in store.appleArticles"
      :key="index"
      class="article"
    >
      <div class="img-and-text-wrapper" :style="{backgroundImage: 'url(' + article.urlToImage + ')'}">
        
      </div>
      <div>
        <div>
          {{ article.title }}
        </div>
        <div class="article-author">
          {{ article.author }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-and-text-wrapper {
  height: 40px;
  width: 40px;
  background-size: cover;
  border-radius: 5px;
  /* border: 1px solid black; */
}
.article {
  /* border: 2px solid black; */
  padding: 10px;
  margin: 20px 0px;
  border-radius: 5px;
  word-wrap: break-word;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(171, 171, 171, 0.75);
  display: flex;
  align-items: center;
  gap: 10px;
}

.article-author {
  font-size: 0.8rem;
  color: gray;
}
</style>
