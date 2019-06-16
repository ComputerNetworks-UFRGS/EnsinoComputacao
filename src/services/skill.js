import API from './API.js'

export default {
  years() {
    return API.get('skills/years').catch(err => err.response)
  },
  tree() {
    return API.get('skills/tree').catch(err => err.response)
  },
  list() {
    return API.get('skills').catch(err => err.response)
  },
  detail(skill_id) {
    return API.get('skills/' + skill_id).catch(err => err.response)
  },
  create(task) {
    return API.post('skills', task).catch(err => err.response)
  },
  update(skill_id, task) {
    return API.put('skills/' + skill_id, task).catch(err => err.response)
  },
  remove(skill_id) {
    return API.delete('skills/' + skill_id).catch(err => err.response)
  },
}