import axios from 'axios';
import {BASE_URL, config} from "@/API";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('token'),
    payload: parseJwt(localStorage.getItem('token'))
  },

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    isCustomer(state) {
      return !!(state.payload && state.payload.roles.includes("CUSTOMER"));
    },
    isEmployee(state) {
      return !!(state.payload && state.payload.roles.includes("EMPLOYEE"));
    }
  },

  mutations: {
    login(state, token) {
      state.token = token;
      state.payload = parseJwt(token);
    },
    logout(state) {
      state.token = null;
      state.payload = null;
    }
  },

  actions: {
    login({commit}, form) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}/api/auth/login`, form, config)
          .then(response => {
            localStorage.setItem('token', response.data.jwt);
            commit('login', response.data.jwt);
            resolve();
          })
          .catch(error => reject(error.response.data.message))
      })
    },
    logout({commit}) {
      commit('logout')
    },
    register({commit}, form) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}/api/auth/customers/register`, form, config)
          .then(response => {
            localStorage.setItem('token', response.data.jwt);
            commit('login', response.data.jwt);
            resolve();
          })
          .catch(error => reject(error.response.data.message))
      })
    },
  }
}
