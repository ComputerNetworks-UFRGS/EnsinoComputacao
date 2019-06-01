import API from './API.js'

const TASK_STATUS = {
  'CREATED': 0,
  'FOR_REVIEW': 1,
  'DENIED': 2,
  'DENIED_NEED_FIX': 3,
  'PUBLISHED': 4,
  'REVIEWED': 5,
}

export default {
  list() {
    return API.get('user/tasks').catch(err => err.response)
  },
  detail(task_id) {
    return API.get('user/tasks/' + task_id).catch(err => err.response)
  },
  create(task) {
    return API.post('user/tasks', task).catch(err => err.response)
  },
  update(task_id, task) {
    return API.put('user/tasks/' + task_id, task).catch(err => err.response)
  },
  remove(task_id) {
    return API.delete('user/tasks/' + task_id).catch(err => err.response)
  },
  publish(task_id) {
    return API.get('user/tasks/' + task_id + '/publish').catch(err => err.response)
  },
  getStatusLabel(status_id) {
    let labels = {
        'CREATED': '',
        'FOR_REVIEW': 'Aguardando revisão',
        'DENIED': 'Publicação negada',
        'DENIED_NEED_FIX': 'Aguardando ajustes',
        'PUBLISHED': 'Publicada',
        'REVIEWED': ''
    }
    for(let status in TASK_STATUS) {
        if(TASK_STATUS[status] == status_id) {
            return labels[status] || ''
        }
    }
    return ''
  },
  getColorLabel(status_id) {
      let labels = {
          'CREATED': 'badge-white',
          'REVIEWED': 'badge-white',
          'FOR_REVIEW': 'badge-light',
          'DENIED_NEED_FIX': 'badge-info',
          'PUBLISHED': 'badge-success',
          'DENIED': 'badge-danger',
      }
      for(let status in TASK_STATUS) {
          if(TASK_STATUS[status] == status_id) {
              return labels[status] || ''
          }
      }
      return ''
  },
  canPublish(task) {
      if(task.status == TASK_STATUS['CREATED']) {
          return true
      } else if(task.status == TASK_STATUS['REVIEWED']) {
          return true
      }
      return false
  },
}