import axios from 'axios'

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_API,
})

export default {
  login(credentials) {
    return HTTP.post('auth/login', credentials)
  },
  register(user) {
    return HTTP.post('auth/register', user)
  },
  loggedIn() {
    let token = localStorage.getItem('token')
    return token !== null && token !== '' && token
  },
  logout() {
    localStorage.setItem('token', '')
  }
}