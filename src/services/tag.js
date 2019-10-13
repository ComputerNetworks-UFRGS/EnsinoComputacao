import API from './API.js'

export default {
  list() {
    return API.get('tag')
  },
  detail(tag_id) {
    return API.get('tag/' + tag_id)
  },
  create(tag) {
    return API.post('tag', tag)
  },
  update(tag_id, tag) {
    return API.put('tag/' + tag_id, tag)
  },
  remove(tag_id) {
    return API.delete('tag/' + tag_id)
  },
}