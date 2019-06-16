import API from './API.js'

export default {
  list() {
    return API.get('learning-stages').catch(err => err.response)
  },  
}