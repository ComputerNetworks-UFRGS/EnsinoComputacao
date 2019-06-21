<template>
  <div>
    <br>
    <router-link to="/dash/curriculos/" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Editar: {{ graph.title }}</h4>

    <!-- <button v-if="graphId" @click="remove" class="button is-small is-light">Excluir esta curriculo</button> -->
    <hr>

    <div>
      <table class="table is-fullwidth">
        <tr>
          <th>Item</th>
          <th>Dependências</th>
        </tr>
        <tr v-for="node of graph.nodes" :key="node.id">
          <td>{{ node.title}}</td>
          <td>
            <table class="table is-fullwidth">
              <tr v-for="dependency of node.dependencies" :key="dependency.id">
                <td>{{ dependency.title }}</td>
                <td>
                    <button class="button is-small is-light">
                        Remover
                    </button>
                </td>
              </tr>
              <tr>
                <button class="button is-small is-light">Adicionar dependência</button>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";

export default {
  data() {
    return {
      graph: false
    };
  },
  created() {
    let graphId = this.$route.params.id;

    if (graphId) {
      Graphs.detail(graphId)
        .then(res => res.data)
        .then(graph => {
          this.graph = graph;
        });
    }
  },
  methods: {}
};
</script>

<style scoped>
.box {
  background: #eeeeee;
  padding: 30px;
  border-radius: 8px;
}
.cursor {
  cursor: pointer;
}
</style>
