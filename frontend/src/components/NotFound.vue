<script setup>
import router from '../router';
import { store } from '../store';

function returnHome() {
  router.push('/')


}
</script>

<template>
  <div class="outer">
    <div class="not-found-wrapper">
      <div class="dots-wrapper">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="not-found">
        <h1>404</h1>
        <button class="return-home" @click="returnHome()">Return Home</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.return-home {
  width: 100%;
  padding: 10px;
  background-color: rgb(115, 255, 115);
border: none;
font-size: 1.2rem;


}
.outer {
  background-color: rgb(65, 127, 228);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
}
h1 {
  margin: 0;
  font-size: 6rem;
}
.not-found-wrapper {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  /* border: 3px solid red; */
}

.not-found {
  background-color: lightgray;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dots-wrapper {
  display: flex;
  gap: 5px;
}

.dots-wrapper > div {
  height: 20px;
  width: 20px;
  border-radius: 1000px;
}

.dots-wrapper > div:nth-child(1) {
  background-color: red;
}

.dots-wrapper > div:nth-child(2) {
  background-color: rgb(255, 200, 99);
}

.dots-wrapper > div:nth-child(3) {
  background-color: rgb(115, 255, 115);
}

@media screen and (min-width: 500px) {
.not-found {
  padding: 60px 120px;
}
}
</style>
