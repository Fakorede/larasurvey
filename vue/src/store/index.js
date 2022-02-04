import {createStore} from 'vuex';
import axiosClient from '../services/axios';
import { SET_USER, LOG_OUT } from './mutation-types';

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('__access_token'),
    },
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit(SET_USER, data)
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit(SET_USER, data)
          return data;
        }).catch(err => err)
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(() => {
          commit(LOG_OUT)
        })
    }
    // register({commit}, user) {
    //   return fetch(`http://localhost:8000/api/register`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(user)
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       commit(SET_USER, res)
    //       return res;
    //     });
    // },
    // login({commit}, user) {
    //   return fetch(`http://localhost:8000/api/login`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(user)
    //   })
    //     .then(res => res.json())
    //     .then(res => {
    //       commit(SET_USER, res)
    //       return res;
    //     });
    // },
  },
  mutations: {
    LOG_OUT: state => {
      state.user.data = {};
      state.user.token = null;

      sessionStorage.removeItem('__access_token');
    },
    SET_USER: (state, user) => {
      state.user.token = user.token;
      state.user.data = user.data;

      sessionStorage.setItem('__access_token', user.token);
    }
  },
  modules: {},
});

export default store;
