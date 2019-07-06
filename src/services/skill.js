import API from './API.js'

export default {
  years() {
    return API.get('skills/years')
  },
  tree() {
    return API.get('skills/tree')
  },
  list() {
    return API.get('skills')
  },
  detail(skill_id) {
    return API.get('skills/' + skill_id)
  },
  create(task) {
    return API.post('skills', task)
  },
  update(skill_id, task) {
    return API.put('skills/' + skill_id, task)
  },
  remove(skill_id) {
    return API.delete('skills/' + skill_id)
  },
}