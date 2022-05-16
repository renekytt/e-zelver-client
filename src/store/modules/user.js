import axios from 'axios';

const state = {
  userId: null,
  token: null
}

const getters = {
  userId(state) {
    return state.userId;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  token(state) {
    return state.token;
  },
}

const mutations = {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
  resetToken(state) {
    state.token = null;
    state.userId = null;
    state.uName = null;
  }
}


const actions = {
  async Register({dispatch}, form) {
    await axios.post('register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
