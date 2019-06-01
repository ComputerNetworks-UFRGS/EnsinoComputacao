import API from './API.js'

export default {
  years() {
    return API.get('skills/years').catch(err => err.response)
  },
  tree() {
    return API.get('skills/tree').catch(err => err.response)
  },
}