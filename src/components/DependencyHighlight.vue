<template>
  <div class="steps">
    <div v-for="step of steps" :key="step.id" class="step">
      <div
        v-for="node of step"
        :key="node.id + Math.random()"
        @click="mouseenter(node)"
        class="node"
        :class="{'node-highlight': nodes[node.id].highlight}"
      >
        <!-- {{ node.id }})  -->
        {{ node.title }}
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";

export default {
  name: "dependency-highlight",
  props: [],
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
      Graphs.detail(1, {
        view: "steps"
      })
        .then(res => res.data)
        .then(res => res.data)
        .then(steps => {
          for (let i in steps) {
            for (let node of steps[i]) {
              node["highlight"] = false;
              this.$set(this.nodes, node.id, node);
            }
          }
          this.steps = steps;
        });
    },
    mouseenter(node) {
      this.clearHighlight();
      this.highlightNodeUp(node);
    },
    clearHighlight() {
      for (let step of this.steps) {
        for (let node of step) {
          this.nodes[node.id].highlight = false;
        }
      }
    },
    highlightNodeUp(node) {
      this.nodes[node.id].highlight = true;
      if (node.dependencies) {
        for (let dependency of node.dependencies) {
          this.highlightNodeUp(this.nodes[dependency]);
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
</style>
