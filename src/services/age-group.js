import API from './API.js'

export default {
  list() {
    return API.get('age-groups').catch(err => err.response)
  },  
}