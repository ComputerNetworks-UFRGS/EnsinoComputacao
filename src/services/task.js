import API from './API.js'

export default {
  list(params) {
    return API.get('tasks', {
      params: params,
    }).catch(err => err.response)
  },  
  detail(task_id) {
    return API.get('tasks/' + task_id).catch(err => err.response)
  },
}