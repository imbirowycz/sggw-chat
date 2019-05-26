export default {
  namespaced: true,
  state: {
    login: 'email@email.pl',
    password: 'root123',
    user: null,
  },
  mutations: {
    createdUser(state, payload) {
      // console.log(payload)
      if (state.user == null) state.user = payload;

    },
    setUserStatus(state, payload) {
      console.log('wywolano state z parametrem: ', payload);
      state.user.userStatus = payload;
      console.log(state.user);
    },
  },
  actions: {
    createAd({commit}, payload) {
      const id = Math.floor(Math.random() * 11);
      payload.id = id.toString();
      console.log(payload);

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
    loginUser(state) {
      if (state.user != null) {
        console.log('user is not null')
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
          if (state.login == param.email && state.password == param.password)
            return true;
          else return false;
        };
      }
    },
  },
};
