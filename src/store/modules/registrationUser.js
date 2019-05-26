export default {
  namespaced: true,
  state: {
    userReg: {},
  },
  getters: {
    getUser (state) {
      return state.userReg;
    }
  },
  actions: {},
  mutations: {
    createdUser(state, payload) {
      // console.log(payload)
      state.userReg = Object.assign(state.userReg, payload);
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
