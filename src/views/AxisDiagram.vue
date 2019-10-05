<template>
  <div>
    <button @click="exportPositions()">Export</button>
    <div id="teste">
      <div 
        class="group" 
        v-for="group of groups" 
        :id="group.id" 
        :key="group.id"
        :ref="group.id"
        :style="{
          'top': group.y + 'px',
          'left': group.x + 'px',
          'height': group.height + 'px'
        }">
        <br>
        ok...
        <br>
      </div>
      <div
        class="node"
        v-for="node of nodes"
        :key="node.id"
        :id="node.id"
        :ref="node.id"
        :class="{
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
      nodes: {},
      edges: [],
      groups: [
        {
          id: 'group1',
          height: 100,
          x: 0,
          y: 0,
        },
        {
          id: 'group2',
          height: 200,
          x: 0,
          y: 0,
        },
        {
          id: 'group3',
          height: 300,
          x: 0,
          y: 0,
        },
      ],
      pb: null
    };
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
        }
        this.nodes = graph.nodes;
        this.edges = graph.edges;

        // set groups position
        let groupMarginTop = 12
        let groupCurrPosTop = 0
        for (let group of this.groups) {      
          group.y = groupMarginTop + groupCurrPosTop
          groupCurrPosTop += groupMarginTop + group.height
        }

        let cmp = this;

        setTimeout(() => {
          jsPlumb.ready(function() {
            cmp.pb = jsPlumb.getInstance({
              Container: "teste",
              // Connector: ["Straight"],
              Connector: ["Bezier", { curviness: 30 }],
              Endpoint: ["Blank", { radius: 3 }],
              Overlays: [["Arrow", { location: 1, width: 8, length: 8 }]],
              Anchors: ["Bottom", "Top"]
            });

            cmp.pb.batch(function() {

              for (let group of cmp.groups) {
                cmp.pb.addGroup({
                  el: cmp.$refs[group.id],
                  id: group.id,
                  constrain: true,
                  anchor: "Continuous",
                  endpoint: "Blank",
                  droppable: false
                });
              }

              for (let edge of cmp.edges) {
                edge["cssClass"] = "edd";
                cmp.pb.connect(edge);
              }

              for (let node of cmp.nodes) {
                cmp.pb.draggable(node.id);
                console.log('node.id', node.id, cmp.$refs[node.id][0])
                cmp.pb.addToGroup("group1", cmp.$refs[node.id][0]);
              }

            });
          });
        }, 100);
      });
  },

  methods: {
    nodeClick(node) {
      this.clearHighlight();
      this.pb.select({ source: node.id }).setPaintStyle({
        stroke: "black",
        strokeWidth: 3
      });

      node.isSelected = true;
      this.highlightNodeUp(node);
      this.highlightNodeDown(node);
    },
    nodeMouseover(node) {
      // node.isSelected = true;
      // this.highlightNodeUp(node.dependencies);
      // this.highlightNodeDown(node);
    },
    nodeMoueleave(node) {
      // this.clearHighlight();
      // console.log("mouseleave", node.id);
    },
    clearHighlight() {
      this.pb.select().setPaintStyle({
        stroke: "#aaaaaa",
        strokeWidth: 1
      });
      for (let node of this.nodes) {
        node.isSelected = false;
        node.highlight = false;
        node.isDependent = false;
      }
    },
    highlightNodeUp(node) {
      for (let dependency of node.dependencies) {
        let dep_node = this.nodes.find(i => i.id == "node" + dependency);
        dep_node.highlight = true;
        this.pb.select({ 
          source: dep_node.id,
          target: node.id
        }).setPaintStyle({
          stroke: "black",
          strokeWidth: 3
        });
        this.highlightNodeUp(dep_node);
      }
    },
    highlightNodeDown(node) {
      if (node.dependents) {
        for (let dependent of node.dependents) {
          let dep_node = this.nodes.find(i => i.id == "node" + dependent);
          if (dep_node && (true || dep_node.step == parseInt(dep_node.step) + 1)) {
            dep_node.isDependent = true;
          }
        }
      }
    },
    exportPositions() {
      for (let node of this.nodes) {
        // TODO...
        console.log(
          node.id,
          this.$refs[node.id][0].style.top,
          this.$refs[node.id][0].style.left
        );
      }
    }
  }
};
</script>

<style>
.teste svg.edd path {
  stroke: #ddd;
  stroke-width: 1;
}
</style>

<style lang="scss">

body, html {
  background: #444!important;
}

#teste {
  position: relative;
  height: 100%;
  border: 1px solid blue;

  .group {
    position: absolute;
    background: #333;
    border: 1px solid red;
    width: 800px;
  }

  .node {
    position: absolute;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 20px;
    width: 140px;
    font-size: 12px;
    background: #888;

    &.node-highlight {
      background: #fffebe;
    }
    &.node-dependent {
      background: #80ecff;
    }
    &.node-current {
      background: #6ee974;
    }

    .node-content {
      padding: 8px;
      text-align: center;
    }
  }
}
</style>