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
      console.log(payload, 'create user')
       state.user = payload;
    },
    setUserId(state, payload) {
      state.user.id = payload;
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
    userMock(state) {
      return state.userMock;
    },
    loginUser(state) {
      if (state.user != null) {
        console.log('user is not null');
        return param => {
          if (
            state.user.email == param.email &&
            state.user.password == param.password
          )
            return true;
          else return false;
        };
      } else {
        console.log('else')
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
