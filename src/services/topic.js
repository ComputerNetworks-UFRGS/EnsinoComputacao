import API from './API.js'

export default {
  list() {
    return API.get('topics').catch(err => err.response)
  },
  create(topic) {
    return API.post('topics', topic).catch(err => err.response)
  },
  delete(id) {
    return API.delete('topics/' + id).catch(err => err.response)
  },
}