<script setup>
// import { ref } from 'vue'

// defineProps({
//   msg: String,
// })

// const count = ref(0)
</script>

<template>
  <main>
    <div>
      <div
        style="text-align: left; font-weight: bold; color: rgb(25, 110, 234)"
      >
        Odinbook
      </div>
      <div>Connect with friends and the world around you on Facebook.</div>
    </div>

    <form id="loginForm" @submit.prevent="submit()">
      <div style="display: flex; flex-direction: column; gap: 10px">
        <input
          v-model="username"
          placeholder="Username"
          style="padding: 10px; border-radius: 10px; border: 1px solid gray"
        />
        <input
          v-model="password"
          placeholder="Password"
          style="padding: 10px; border-radius: 10px; border: 1px solid gray"
        />
        <button
          id="loginBtn"
          style="
            background-color: rgb(25, 110, 234);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 10px;
          "
        >
          Login
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
#loginForm {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  border: 1px solid gray;
}

#loginBtn {
  cursor: pointer;
}

main {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin-top: 120px;
}

@media screen and (min-width: 900px) {
  main {
    /* display: flex;
  flex-direction: row; */
    /* gap: 40px;
  align-items: center;
  margin-top: 120px; */
  }
}
</style>
