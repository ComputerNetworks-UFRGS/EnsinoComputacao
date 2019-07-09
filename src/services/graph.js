import API from './API.js'

export default {
    list() {
        return API.get('temp-graphs/')
    },
    detail(graph_id) {
        return API.get('temp-graphs/' + graph_id)
    },
    create(graph) {
        return API.post('temp-graphs/', graph)
    },
    remove(graph_id) {
        return API.delete('temp-graphs/' + graph_id)
    },
    addNode(graph_id, data) {
        return API.post('temp-graphs/' + graph_id + '/node', data)
    },
    removeNode(graph_id, node_id) {
        return API.delete('temp-graphs/' + graph_id + '/node/' + node_id)
    },
    addEdge(graph_id, data) {
        return API.post('temp-graphs/' + graph_id + '/edge', data)
    },
    removeEdge(graph_id, from_id, to_id) {
        let url = 'temp-graphs/' + graph_id + '/edge/' + from_id + '/' + to_id
        return API.delete(url)
    },
}