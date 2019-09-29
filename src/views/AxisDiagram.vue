<template>
  <div>
    <button @click="exportPositions()">Export</button>
    <div id="teste">
      <div
        v-for="node of nodes"
        :key="node.id"
        :id="node.id"
        :ref="node.id"
        class="node"
        :class="{
          'node-hover': node.hovered,
          'node-highlight': node.highlight,
          'node-dependent': node.isDependent,
          'node-current': node.isSelected
        }"
        :style="{
          'top': node.y,
          'left': node.x
        }"
        @click="nodeClick(node)"
        @mouseover="nodeMouseover(node)"
        @mouseleave="nodeMoueleave(node)"
      >
        <div class="node-content" v-html="node.title"></div>
      </div>
    </div>
    <!-- <input type="text" v-model="x" />
    <input type="text" v-model="y" />
    <button @click="teste">aaa</button>-->
  </div>
</template>
<script>
import Graphs from "@/services/graph";
import { jsPlumb } from "../../node_modules/jsplumb/dist/js/jsplumb";

export default {
  data() {
    return {
      nodes: [],
      edges: []
    };
  },
  methods: {
    nodeClick(node) {
      // console.log("nodeclick", node.id);
    },
    nodeMouseover(node) {
      // console.log("mouseover", node.id);
      node.hovered = true;
    },
    nodeMoueleave(node) {
      // console.log("mouseleave", node.id);
      node.hovered = false;
    },
    exportPositions() {
      for (let node of this.nodes) {
        console.log(
          node.id,
          this.$refs[node.id][0].style.top,
          this.$refs[node.id][0].style.left
        );
      }
    }
  },
  mounted() {
    Graphs.detail(1, {
      view: "jsplumb"
    })
      .then(res => res.data)
      .then(res => res.data)
      .then(graph => {
        for (let node of graph.nodes) {
          node["highlight"] = false;
          node["isDependent"] = false;
          node["isSelected"] = false;
          // node["step"] = i;
          // this.$set(this.nodes, node.id, node);
        }
        this.nodes = graph.nodes;
        this.edges = graph.edges;
        // console.log('steps', graph.steps)

        let cmp = this;

        setTimeout(() => {
          jsPlumb.ready(function() {
            let pb = jsPlumb.getInstance({
              Container: "teste",
              Connector: ["Bezier", { curviness: 50 }],
              Endpoint: ["Blank", { radius: 3 }],
              Overlays: [["Arrow", { location: 1, width: 8, length: 8 }]],
              Anchors: ["Bottom", "Top"]
            });

            pb.batch(function() {
              for (let edge of cmp.edges) {
                pb.connect(edge);
              }

              for (let node of cmp.nodes) {
                pb.draggable(node.id);
              }
            });
          });
        }, 100);
      });
  }
};
</script>

<style lang="scss" scoped>
#teste {
  position: relative;
  height: 100%;
  border: 1px solid blue;

  .node {
    position: absolute;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 20px;
    width: 100px;
    font-size: 12px;

    &.node-hover {
      background: #dddddd;
    }

    .node-content {
      padding: 20px;
    }
  }
}
</style>