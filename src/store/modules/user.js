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
      state.token = payload.jwt;
      //state.userId = payload.userId;
    },
    resetToken(state) {
      state.token = null;
      state.userId = null;
    }
  }


  const actions = {
    async Register({dispatch}, form) {
      await axios.post('/api/auth/customers/register', form)
      let userLogin = {
        'email' : form.email,
        'password' : form.password
      }
      await dispatch('LogIn', userLogin)
    },
  
    async LogIn({commit}, user) {
      await axios.post("/api/auth/login", user);
      await commit("setUser", user);
    },
    async LogOut({ commit }) {
      let user = null;
      commit("logout", user);
    },
  };

  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};