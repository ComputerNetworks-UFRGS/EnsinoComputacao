<template>
  <div>
    <div id="teste">
      <div
        v-for="node of nodes"
        :key="node.id"
        :id="node.id"
        class="node"
        :class="{'hover': node.hovered}"
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
import { jsPlumb } from "../../node_modules/jsplumb/dist/js/jsplumb";

export default {
  data() {
    return {
      x: 0,
      y: 0,
      plumb: null,
      nodes: [
        { id: "da", title: "las dad", x: "200px", y: "50px", hovered: false },
        { id: "db", title: "div b", x: "50px", y: "200px", hovered: false },
        { id: "dc", title: "div c", x: "300px", y: "400px", hovered: false },
        { id: "dd", title: "div a", x: "400px", y: "200px", hovered: false }
      ],
      edges: [
        { source: "da", target: "db" },
        { source: "da", target: "dc" },
        { source: "db", target: "dc" },
        { source: "da", target: "dd" }
      ]
    };
  },
  methods: {
    teste() {
      this.plumb(this.x, this.y);
    },
    nodeClick(node) {
      console.log("nodeclick", node.id);
    },
    nodeMouseover(node) {
      console.log("mouseover", node.id);
      node.hovered = true;
    },
    nodeMoueleave(node) {
      console.log("mouseleave", node.id);
      node.hovered = false;
    }
  },
  mounted() {
    let cmp = this;

    jsPlumb.ready(function() {
      let pb = jsPlumb.getInstance({
        Container: "teste",
        Connector: ["Bezier", { curviness: 50 }],
        Endpoint: ["Blank", { radius: 3 }],
        Overlays: [["Arrow", { location: 1, width: 8, length: 8 }]],
        Anchors: ["Bottom", "Top"]
      });

      for (let edge of cmp.edges) {
        pb.connect(edge);
      }

      for (let node of cmp.nodes) {
        pb.draggable(node.id);
      }
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

    &.hover {
      background: #dddddd;
    }

    .node-content {
      padding: 20px;
    }
  }
}
</style>