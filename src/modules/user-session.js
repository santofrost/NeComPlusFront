import axios from 'axios'

const storage = window.localStorage
const STORAGE_TOKEN_KEY = 'user-token'
const STORAGE_USER_KEY = 'user'

export default {
  loadSession () {
    const session = {
      token: storage.getItem(STORAGE_TOKEN_KEY),
      user: JSON.parse(storage.getItem(STORAGE_USER_KEY))
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + session.token
    return session
  },

  saveSession (token, user) {
    storage.setItem(STORAGE_TOKEN_KEY, token)
    storage.setItem(STORAGE_USER_KEY, JSON.stringify(user))

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },

  quitSession () {
    window.localStorage.clear()

    axios.defaults.headers.common['Authorization'] = null
  },

  testToken (token) {
    return new Promise((resolve, reject) => {
      axios.get('api/auth/testToken', token)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
