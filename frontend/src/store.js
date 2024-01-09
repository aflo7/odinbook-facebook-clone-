import { reactive } from 'vue';

export const store = reactive({
  username: '',
  password: '',
  count: 0,
  text: '',
  loggedIn: false,
  isLoading: false,
  posts: [],
  mindTitle: "",
  mindText: ""
});
