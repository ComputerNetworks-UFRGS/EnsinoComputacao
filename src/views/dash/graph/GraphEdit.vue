<template>
  <div>
    <br>
    <router-link to="/dash/curriculos/" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Editar: {{ graph.title }}</h4>

    <button
      v-if="graph && graph.id"
      @click="remove"
      class="button is-small is-light"
      v-auth="'curri.delete'"
    >Excluir este currículo</button>
    <hr v-auth="'curri.edit'">

    <div>
      <div class="table is-fullwidth">
        <button
          class="button is-info"
          @click="openModalAddNode"
          v-auth="'curri.edit'"
        >Adicionar novo tópico</button>

        <hr>
        <span v-if="graph.nodes && graph.nodes.length > 0">
          <div v-for="node of graph.nodes" :key="node.id">
            <br>
            <b>{{ node.title}}</b>
            <div class="field has-addons is-pulled-right">
              <p class="control">
                <button
                  class="button is-small is-light"
                  @click="removeNode(node.id)"
                  v-auth="'curri.edit'"
                >Remover tópico</button>
                <button
                  class="button is-small is-info"
                  @click="openModalAddEdge(node)"
                  v-auth="'curri.edit'"
                >Adicionar pré-requisito</button>
              </p>
            </div>

            <div
              v-if="node.dependencies && node.dependencies.length > 0"
              style="padding-left:20px;background: #fafafa;"
            >
              Pré-requisitos
              <table class="table is-fullwidth">
                <tr v-for="dependency of node.dependencies" :key="dependency.id">
                  <td>
                    {{ dependency.title }}
                    <button
                      class="button is-small is-white"
                      @click="removeEdge(dependency.id, node.id)"
                      v-auth="'curri.edit'"
                    >Remover</button>
                  </td>
                </tr>
              </table>
            </div>
            <div v-else>
              <small>Sem pré-requisitos</small>
            </div>
          </div>
        </span>
        <span v-else>Nenhum tópico adicionado.</span>
      </div>
    </div>
    <modal-select-topic :show.sync="isOpenModalAddNode" @selected="addNode($event)"></modal-select-topic>
    <b-modal :active="isOpenModalAddEdge" @close="isOpenModalAddEdge = false">
      <div class="card modal-select-node">
        <div class="card-content">
          <div class="content">
            <label>
              <b>Selecione qual o pré-requisito</b>
            </label>
            <br>
            <div class="select">
              <select v-model="sourceNode">
                <option v-for="node of nodesToAdd" :key="node.id" :value="node.id">{{ node.title }}</option>
              </select>
              <br>
              <button
                class="button is-success"
                @click="addEdge(sourceNode)"
                :disabled="!sourceNode"
              >Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Graphs from "@/services/graph";
import ModalSelectTopic from "@/components/ModalSelectTopic";
import _ from "lodash";

export default {
  components: {
    ModalSelectTopic
  },
  data() {
    return {
      graph: false,
      isOpenModalAddNode: false,
      isOpenModalAddEdge: false,
      selectedNode: undefined,
      sourceNode: undefined
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      let graphId = this.$route.params.id;

      if (graphId) {
        Graphs.detail(graphId)
          .then(res => res.data)
          .then(graph => {
            this.graph = graph;
          });
      }
    },
    remove: function() {
      this.$dialog.confirm({
        message: "Confirma exclusão de currículo?",
        onConfirm: () => {
          Graphs.remove(this.graph.id).finally(() => {
            this.$router.push("/dash/curriculos");
          });
        }
      });
    },
    addNode: function(topic) {
      this.isOpenModalAddNode = false;
      console.log("--", topic);
      let node = {
        topic_id: topic.id
      };
      console.log("addNode", node);
      Graphs.addNode(this.graph.id, node)
        .then(res => {
          this.fetch();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    removeNode(node_id) {
      this.$dialog.confirm({
        message: "Confirma exclusão de tópico?",
        onConfirm: () => {
          Graphs.removeNode(this.graph.id, node_id)
            .then(res => {
              this.fetch();
            })
            .catch(err => {
              console.log("err", err);
            });
        }
      });
    },
    addEdge(from_id) {
      this.isOpenModalAddEdge = false;
      let edge = {
        from_id: from_id,
        to_id: this.selectedNode.id
      };
      Graphs.addEdge(this.graph.id, edge)
        .then(res => {
          this.fetch();
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    removeEdge(from_id, to_id) {
      this.$dialog.confirm({
        message: "Confirma exclusão de dependência?",
        onConfirm: () => {
          Graphs.removeEdge(this.graph.id, from_id, to_id)
            .then(res => {
              this.fetch();
            })
            .catch(err => {
              console.log("err", err);
            });
        }
      });
    },
    openModalAddNode() {
      this.isOpenModalAddNode = true;
    },
    openModalAddEdge(node) {
      this.selectedNode = node;
      this.isOpenModalAddEdge = true;
    }
  },
  computed: {
    nodesToAdd: function() {
      return _.filter(this.graph.nodes, n => {
        if (this.selectedNode) {
          return n.id != this.selectedNode.id;
        }
        return true;
      });
    }
  }
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
.modal-select-node .card-content {
  min-height: 40vh;
}
</style>
