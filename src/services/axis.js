import API from './API.js'

export default {
  list() {
    return API.get('axis')
  },
}