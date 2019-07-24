<template>
  <div class="columns">
    <div class="column is-3"></div>
    <div class="column">
      <br />
      <br />
      <h5 class="title is-5 has-text-centered">Planos de ensino</h5>
      <div v-for="graph of graphs" :key="graph.id" class="card">
        <router-link :to="'/planos-de-ensino/' + graph.id" class="card-header">
          <p class="card-header-title">{{ graph.title }}</p>
          <div class="card-header-icon">
            <span class="icon">
              <i class="fas fa-angle-right"></i>
            </span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="column is-3"></div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";
export default {
  name: "list-graphs",
  data() {
    return {
      graphs: []
    };
  },
  mounted() {
    Graphs.list()
      .then(res => res.data)
      .then(graphs => {
        this.graphs = graphs;
      });
  }
};
</script>

<style scoped>
header {
    cursor: pointer;
}
</style>
