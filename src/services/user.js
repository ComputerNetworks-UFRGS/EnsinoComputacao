import API from './API.js'

export default {
  list() {
    return API.get('users')
  },
  update(user_id, user) {
    return API.put('users/' + user_id, user)
  },
  detail() {
    API.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return API.get('user')
  },
  hasPermission(permissions, required_permissions) {
    let required = required_permissions.split('|') // or
    for (let p of required) {
      if (permissions && permissions.indexOf(p) > -1) {
        return true
      }
    }
    return false
  }

}