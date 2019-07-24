<template>
  <div>
    <div class="steps is-vertical">
      <div v-for="step of steps" :key="step.id" class="step">
        <div
          v-for="node of step"
          :key="node.id + Math.random()"
          @click="selectNode(node)"
          class="node"
          :class="{
              'node-highlight': nodes[node.id].highlight,
              'node-dependent': nodes[node.id].isDependent,
              'node-current': nodes[node.id].isSelected
          }"
        >
          <!-- {{ node.id }}) -->
          <!-- [{{ node.step }}] -->
          {{ node.title }}
        </div>
        <br />
      </div>
    </div>
    <div class="tags-box">
      <b>Legenda</b>
      <br />
      <div class="tags">
        <div class="tag node-highlight">Pré-requisitos</div>
        <div class="tag node-dependent">Dependentes</div>
        <div class="tag node-current">Seleção atual</div>
      </div>
    </div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";
import _ from "lodash";

export default {
  name: "dependency-highlight",
  props: ["viewMode", "graphId"],
  data() {
    return {
      steps: [],
      nodes: {}
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      Graphs.detail(this.graphId, {
        view: this.viewMode
      })
        .then(res => res.data)
        .then(res => res.data)
        .then(steps => {
          for (let i in steps) {
            for (let node of steps[i]) {
              node["highlight"] = false;
              node["isDependent"] = false;
              node["isSelected"] = false;
              node["step"] = i;
              this.$set(this.nodes, node.id, node);
            }
          }
          this.steps = steps;
        });
    },
    selectNode(node) {
      this.clearHighlight();
      this.nodes[node.id].isSelected = true;
      this.highlightNodeUp(node.dependencies);
      this.highlightNodeDown(node);
    },
    clearHighlight() {
      for (let step of this.steps) {
        for (let node of step) {
          this.nodes[node.id].isSelected = false;
          this.nodes[node.id].highlight = false;
          this.nodes[node.id].isDependent = false;
        }
      }
    },
    highlightNodeUp(dependencies) {
      for (let dependency of dependencies) {
        this.nodes[dependency].highlight = true;
        this.highlightNodeUp(this.nodes[dependency].dependencies);
      }
    },
    highlightNodeDown(node) {
      if (node.dependents) {
        for (let dependent of node.dependents) {
          let dep_node = this.nodes[dependent];
          if (dep_node && dep_node.step == parseInt(node.step) + 1) {
            dep_node.isDependent = true;
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.steps {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: auto;
  align-items: center;
}
.step {
  margin-bottom: 12px;
  display: flex;
}
.node {
  border: 1px solid #ddd;
  padding: 14px;
  line-height: 18px;
  min-width: 180px;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  margin: 0px 6px;
  transition: all 1s;
}
.node-highlight {
  background: #fffebe;
}
.node-dependent {
  background: #80ecff;
}
.node-current {
  background: #6ee974;
}
.tags-box {
  text-align: center;
  padding: 12px 6px 6px 6px;
  margin-bottom: 12px;
  border-top: 1px solid #ddd;
}
.tags {
  opacity: 0.7;
  display: flex;
  justify-content: center;
}
.is-vertical {
  flex-direction: unset!important;
  align-items: flex-start!important;
  .step {
    flex-direction: column;
    .node {
      margin-bottom: 8px;
    }
  }
}
</style>
