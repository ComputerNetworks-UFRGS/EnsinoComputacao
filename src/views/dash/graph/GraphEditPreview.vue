<template>
    <div>
        <router-link :to="'/dash/curriculos/editar/' + $route.params.id + '/criar'" class="button is-default">Voltar</router-link>
        <div v-if="graph && graph.id">
            
            <graph-view-groups 
                v-if="graph.group_by_year"
                :graph-id="graph.id"
                @exportPositions="exportPositions"></graph-view-groups>
            
            <graph-view 
                v-if="!graph.group_by_year"
                :graph-id="graphId"
                @exportPositions="exportPositions"></graph-view>

        </div>
    </div>
</template>

<script>
import Graphs from "@/services/graph";
import GraphViewGroups from "@/components/GraphViewGroups";
import GraphView from "@/components/GraphView";

export default {
    components: {
        GraphViewGroups,
        GraphView
    },
    data () {
        return {
            graph: {},
            graphId: false,
        }
    },
    created() {
        this.graphId = this.$route.params.id;
        
        if (this.graphId) {
            Graphs.detail(this.graphId)
                .then(res => res.data)
                .then(graph => {
                    this.graph = graph;
                    console.log('graph', graph)
                });
        } else {
            this.$router.push('/dash/curriculos')
        }
    },
    methods: {
        exportPositions(positions) {
            this.$dialog.confirm({
                message: "Confirma registro das posições dos objetos?",
                onConfirm: () => {
                    Graphs.updatePositions(this.$route.params.id, {
                        positions: positions
                    })
                    .finally(() => {
                        alert('Posição dos objetos gravada.')
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>