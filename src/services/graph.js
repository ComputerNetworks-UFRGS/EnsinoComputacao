import API from './API.js'

export default {
    list() {
        return API.get('graphs')
    },
    detail(graph_id, params = {}) {
        return API.get('graphs/' + graph_id, {
            params: params
        })
    },
    create(graph) {
        return API.post('graphs/', graph)
    },
    remove(graph_id) {
        return API.delete('graphs/' + graph_id)
    },
    addNode(graph_id, data) {
        return API.post('graphs/' + graph_id + '/node', data)
    },
    removeNode(graph_id, node_id) {
        return API.delete('graphs/' + graph_id + '/node/' + node_id)
    },
    addEdge(graph_id, data) {
        return API.post('graphs/' + graph_id + '/edge', data)
    },
    removeEdge(graph_id, from_id, to_id) {
        let url = 'graphs/' + graph_id + '/edge/' + from_id + '/' + to_id
        return API.delete(url)
    },
}
