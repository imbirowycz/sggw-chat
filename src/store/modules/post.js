import http from "@/http/http"
export default {
  namespaced: true,
  state: {
    posts: []
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    addPost(state, payload) {
      state.posts.unshift(payload);
    },
  },
  actions: {
    fetchPosts({commit}, payload) {
        http
        .get(`posts/getAll?id_group=${payload}`)
        .then(respnse => {
          commit('setPosts', respnse.data);
        }).catch(err => {
            console.error('Błąd przy pobieraniu postów! Error: ', err)
        })
    },
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
};
