import API from './API.js'

export default {
    list() {
        return API.get('temp-graphs/').catch(err => err.response)
    },
    detail(graph_id) {
        return API.get('temp-graphs/' + graph_id).catch(err => err.response)
    },
    create(graph) {
        return API.post('temp-graphs/', graph).catch(err => err.response)
    },
    remove(graph_id) {
        return API.delete('temp-graphs/' + graph_id).catch(err => err.response)
    },
    addNode(graph_id, data) {
        return API.post('temp-graphs/' + graph_id + '/node', data).catch(err => err.response)
    },
    removeNode(graph_id, node_id) {
        return API.delete('temp-graphs/' + graph_id + '/node/' + node_id).catch(err => err.response)
    },
    addEdge(graph_id, data) {
        return API.post('temp-graphs/' + graph_id + '/edge', data).catch(err => err.response)
    },
    removeEdge(graph_id, from_id, to_id) {
        let url = 'temp-graphs/' + graph_id + '/edge/' + from_id + '/' + to_id
        return API.delete(url).catch(err => err.response)
    },
}