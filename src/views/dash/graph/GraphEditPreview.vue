<template>
    <div>
        <router-link :to="'/dash/curriculos/editar/' + $route.params.id" class="button is-default">Voltar</router-link>
        <graph-view-groups 
            :graph-id="$route.params.id" 
            @exportPositions="exportPositions"></graph-view-groups>
        <!-- <graph-view></graph-view> -->
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