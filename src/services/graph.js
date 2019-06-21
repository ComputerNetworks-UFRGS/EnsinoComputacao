import API from './API.js'

export default {
    list() {
        return API.get('temp-graphs/').catch(err => err.response)
    },
    detail(graph_id) {
        return API.get('temp-graphs/' + graph_id).catch(err => err.response)
    },
    addNode(graph_id, data) {
        return API.post('temp-graphs/' + graph_id + '/node').catch(err => err.response)
    },
    removeNode(graph_id, node_id) {
        return API.delete('temp-graphs/' + graph_id + '/node/' + node_id).catch(err => err.response)
    }
}