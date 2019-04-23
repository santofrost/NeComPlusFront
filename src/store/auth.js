import axios from 'axios'
import userSession from '../modules/user-session'

export default {
  namespaced: true,

  state: {
    user: null,
    token: null
  },

  getters: {
    token: state => state.token,
    user: state => state.user,

    userIsLogged: (_state, getters) => !!getters.token
  },

  mutations: {
    setToken (state, token) {
      state.token = token
    },

    removeToken (state) {
      state.token = null
    },

    setUser (state, user) {
      state.user = user
    },

    removeUser (state) {
      state.user = null
    }
  },

  actions: {
    loadUser (store) {
      let session = userSession.loadSession()
      store.commit('setToken', session.token)
      store.commit('setUser', session.user)
    },

    login (store, user, persistentSession) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/users/authenticate', user)
          .then((response) => {
            let userResult = response.data
            store.commit('setUser', userResult)
            store.commit('setToken', userResult.token)
            userSession.saveSession(userResult.token, userResult, persistentSession)
            resolve(user)
          }, function (err) {
            console.error('Login error', err)
            reject(err.response)
          })
      })
    },

    logout ({ commit }, router) {
      commit('removeToken')
      commit('removeUser')
      userSession.quitSession()
      if (router) {
        router.push({ name: 'home' })
      }
    },

    processAuthError ({ dispatch }, errResponse) {
      if (errResponse.status === 401) {
        dispatch('logout')
      }
    }
  }
}
