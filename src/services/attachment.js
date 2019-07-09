import API from './API.js'

export default {
    list(task_id) {
        return API.get('user/tasks/' + task_id + '/attachment')
    },
    create(task_id, attachment) {
        return API.post('user/tasks/' + task_id + '/attachment', attachment)
    },
    remove(task_id, attachment_id) {
        return API.delete('user/tasks/' + task_id + '/attachment/' + attachment_id)
    },
}