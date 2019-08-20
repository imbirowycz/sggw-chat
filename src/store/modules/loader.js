export default {
  namespaced: true,
  state: {
    status: 'LOADED',
  },
  getters: {
    getStatus(state) {
      return state.status;
    },
  },
  mutations: {
    setStatus (state, payload){
        state.status = payload
    },
    setLoaded (state) {
      state.status = "LOADED"
    },
    setLoading(state) {
      state.status = "LOADING"
    },
    setError(state) {
      state.status = "ERROR"
    }
   },
};
