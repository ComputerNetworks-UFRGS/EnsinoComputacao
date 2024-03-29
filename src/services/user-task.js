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
    return API.get('user/tasks')
  },
  detail(task_id) {
    return API.get('user/tasks/' + task_id)
  },
  create(task) {
    return API.post('user/tasks', task)
  },
  update(task_id, task) {
    return API.put('user/tasks/' + task_id, task)
  },
  remove(task_id) {
    return API.delete('user/tasks/' + task_id)
  },
  publish(task_id) {
    return API.get('user/tasks/' + task_id + '/publish')
  },
  getStatusLabel(status_id) {
    let labels = {
        'CREATED': 'A publicar',
        'FOR_REVIEW': 'Aguardando avaliação de revisor',
        'DENIED': 'Publicação negada',
        'DENIED_NEED_FIX': 'Aguardando ajustes do autor',
        'PUBLISHED': 'Publicada',
        'REVIEWED': 'Revisada'
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
          'CREATED': 'is-light',
          'REVIEWED': 'is-light',
          'FOR_REVIEW': 'is-light',
          'DENIED_NEED_FIX': 'is-light',
          'PUBLISHED': 'is-light',
          'DENIED': 'is-light',
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