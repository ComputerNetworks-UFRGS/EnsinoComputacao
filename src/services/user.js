import API from './API.js'

export default {
  list() {
    return API.get('users').catch(err => err.response)
  },  
  update(user_id, user) {
    return API.put('users/' + user_id, user).catch(err => err.response)
  },
  // Mais informações do usuário logado
  detail() {
    return API.get('user').catch(err => err.response)
  }

}