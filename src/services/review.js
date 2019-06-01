import API from './API.js'

export default {
  list() {
    return API.get('reviews').catch(err => err.response)
  },
  detail(task_id) {
    return API.get('reviews/' + task_id).catch(err => err.response)
  },
  create(task_id, data) {
    return API.post('reviews/' + task_id + '/comment', data).catch(err => err.response)
  },
  setStatus(task_id, data) {
    return API.post('reviews/' + task_id + '/set-status', data).catch(err => err.response)
  }
}