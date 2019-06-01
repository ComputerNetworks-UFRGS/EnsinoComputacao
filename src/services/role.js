import API from './API.js'

export default {
  list() {
    return API.get('roles').catch(err => err.response)
  },  
  detail(role_id) {
    return API.get('roles/' + role_id).catch(err => err.response)
  },
  create(role) {
    return API.post('roles', role).catch(err => err.response)
  },
  update(role_id, permissions) {
    return API.put('roles/' + role_id, {
        permissions: permissions,
    }).catch(err => err.response)
  },
  remove(role_id) {
    return API.delete('roles/' + role_id).catch(err => err.response)
  },
}