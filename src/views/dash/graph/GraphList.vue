<template>
  <div>
    <br />
    <router-link
      to="/dash/curriculos/criar"
      class="button is-success is-pulled-right"
      v-auth="'curri.create'"
    >Criar novo currículo</router-link>

    <h4 class="title is-4">Currículos</h4>

    <div class="card">
      <div class="card-content">
        <div v-if="isLoading">
          <br />
          <br />
        </div>
        <div v-else>
          <div class="columns graph-list" v-for="graph of graphs" :key="graph.id">
            <div class="column is-10 nowrap-text">
              {{ graph.title }}
              <small>{{ graph.description }}</small>
            </div>
            <div class="column">
              <div class="field has-addons is-pulled-right">
                <p class="control">
                  <router-link
                    v-auth="'curri.detail'"
                    :to="'/dash/curriculos/editar/' + graph.id"
                    class="button is-small"
                  >Editar</router-link>
                </p>
              </div>
              <div class="btn-group"></div>
            </div>
          </div>
        </div>
        <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      </div>
    </div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";
import _ from "lodash";

export default {
  data() {
    return {
      isLoading: false,
      graphs: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.isLoading = true;
      Graphs.list()
        .then(res => res.data)
        .then(graphs => {
          this.graphs = graphs;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {}
};
</script>

<style scoped>
.graph-list .column {
  padding: 0.5rem 0.2rem;
}
.graph-list:hover {
  background: rgba(0, 0, 0, 0.06);
}
</style>
