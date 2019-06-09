import API from './API.js'

export default {
  list() {
    return API.get('topics').catch(err => err.response)
  },
  create(topic) {
    return API.post('topics', topic).catch(err => err.response)
  },
}