import API from './API.js'

export default {
  list(params) {
    return API.get('tasks', {
      params: params,
    })
  },  
  detail(task_id) {
    return API.get('tasks/' + task_id)
  },
}