export default {
  namespaced: true,
  state: {
    userReg: {},
  },
  getters: {},
  actions: {},
  mutations: {
    createdUser(state, payload) {
      // console.log(payload)
      state.userReg = Object.assign({}, payload);
    },
    setPasswordInUser(state, payload) {
      state.userReg.password = payload;
      // console.log('user - ',state.user)
    },
    setUserStatus(state, payload) {
      state.userReg.userStatus = payload;
    },
    finishedRegistration () {
        
    }
  },
};
