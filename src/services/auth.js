import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
})

// TODO: 401 redirect to login or refresh token
// HTTP.interceptors.response.use(function (response) {
//   console.log('response', response)  
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

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