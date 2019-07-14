import API from './API.js'

export default {
  list() {
    return API.get('reviews')
  },
  detail(task_id) {
    return API.get('reviews/' + task_id)
  },
  create(task_id, data) {
    return API.post('reviews/' + task_id + '/comment', data)
  },
  setStatus(task_id, data) {
    return API.post('reviews/' + task_id + '/set-status', data)
  }
}