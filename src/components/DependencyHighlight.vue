<template>
  <div class="steps">
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
</template>

<script>
import Graphs from "@/services/graph";
import _ from "lodash";

export default {
  name: "dependency-highlight",
  props: {},
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
      Graphs.detail(7, {
        // view: "steps"
        view: "years"
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

<style scoped>
.steps {
  display: flex;
  max-width: 100%;
  overflow-x: auto;
}
.node {
  border: 1px solid #ddd;
  padding: 12px;
  width: 200px;
}
.node-highlight {
  background: #f8f300;
}
.node-dependent {
  background: #bef5ff;
}
.node-current {
  background: #6ee974;
}
</style>
