export default {
  namespaced: true,
  state: {
    userMock: {
      login: 'email@email.pl',
      password: 'root123',
      firstName: 'Admin',
      lastName: '',
    },
    user: null,
  },
  mutations: {
    userCreate(state, payload) {
       state.user = payload;
    },
    setUserId(state, payload) {
      state.user.id = payload;
    },
    setUserStatus(state, payload) {
      state.user.userStatus = payload;
    },
    logOutUser (state) {
      state.user = null;
    }
  },
  actions: {
    createAd({commit}, payload) {
      const id = Math.floor(Math.random() * 11);
      payload.id = id.toString();

      commit('createAd', payload);
    },
    createdUser({commit}, payload) {
      commit('createdUser', payload);
    },
  },
  getters: {
    userGet(state) {
       return state.user;
    },
    userMock(state) {
      return state.userMock;
    },
    loginUser(state) {
      if (state.user != null) {
        return param => {
          if (
            state.user.email == param.email &&
            state.user.password == param.password
          )
            return true;
          else return false;
        };
      } else {
        return param => {
          if (state.userMock.login == param.email && state.userMock.password == param.password){
            return true;
          }
          else return false;
        };
      }
    },
  },
};
