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
      console.log(payload)
        state.status = payload
    }
   },
};
