export default {
  namespaced: true,
  state: {
    oldRoom: null,
    currentRoom: null,
    descriptions: null,
    // type: parseon or group
  },
  mutations: {
    setRoom(state, payload) {
      console.log('ustawiono nową wartość room na: ', payload);
      state.oldRoom = state.currentRoom;
      state.currentRoom = payload;
    },
    setDescriptions(state, payload) {
      state.descriptions = payload;
    },
  },
  actions: {
    getRoomByParams({commit}, payload) {
      // TODO
      commit('setRoom', payload);
    },
  },
  getters: {
    getCurrentRoom(state) {
      return state.currentRoom;
    },
    getOldRoom(state) {
      return state.oldRoom;
    },
    getDescription(state) {
      return state.descriptions;
    },
  },
};
