import axios from 'axios'

let API = axios.create({
  baseURL: process.env.VUE_APP_API,
})

API.interceptors.request.use(function (config) {
  config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default API
