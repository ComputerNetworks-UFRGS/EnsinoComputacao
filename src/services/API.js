import axios from 'axios'

let API = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
})

API.interceptors.request.use(function (config) {
  config['headers']['Authorization'] = 'Bearer ' + localStorage.getItem('token')
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default API
