import API from './API.js'

export default {
  list(params = false) {
    let payload = {}
    if(params) {
      payload['params'] = params
    }
    return API.get('topics', params).catch(err => err.response)
  },
  create(topic) {
    return API.post('topics', topic).catch(err => err.response)
  },
  delete(id) {
    return API.delete('topics/' + id).catch(err => err.response)
  },
  tree() {
    return API.get('topics/tree').catch(err => err.response)
  },
}