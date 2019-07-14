import API from './API.js'

export default {
  list(params = false) {
    let payload = {}
    if(params) {
      payload['params'] = params
    }
    return API.get('object', params)
  },
  detail(id) {
    return API.get('object/' + id)
  },
  create(object) {
    return API.post('object', object)
  },
  update(id, object) {
    return API.put('object/' + id, object)
  },
  delete(id) {
    return API.delete('object/' + id)
  },
  tree() {
    return API.get('object/tree')
  },
}