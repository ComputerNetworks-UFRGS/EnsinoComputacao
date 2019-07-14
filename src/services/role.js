import API from './API.js'

export default {
  list() {
    return API.get('roles')
  },  
  detail(role_id) {
    return API.get('roles/' + role_id)
  },
  create(role) {
    return API.post('roles', role)
  },
  update(role_id, permissions) {
    return API.put('roles/' + role_id, {
        permissions: permissions,
    })
  },
  remove(role_id) {
    return API.delete('roles/' + role_id)
  },
}