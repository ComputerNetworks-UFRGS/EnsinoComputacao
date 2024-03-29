<template>
  <div class="axis-diagram">
    <button v-if="showEdit" class="button is-info" @click="exportPositions()">Salvar posições</button>
    <div v-if="graphId" class="graphViewGroups" :id="'graph' + graphId">
      <div
        class="group"
        v-for="group of groups"
        :id="'graph' + graphId + '-group-' + group.id"
        :key="group.id"
        :ref="group.id"
        :style="{
          'top': group.y + 'px',
          'left': group.x + 'px',
          'height': group.height + 'px',
          'width': group.width + 'px'
        }"
      >
        <div class="group-title">{{ group.title }}</div>
        <!-- <button @click="group.width += 10">+w</button>
          <button @click="group.width -= 10">-w</button>
          <button @click="group.height += 10">+h</button>
        <button @click="group.height -= 10">-h</button>-->

        <div class="group-nodes">
          <div
            class="node"
            v-for="node of group.nodes"
            :key="node.id"
            :id="'graph' + graphId + '-' + node.id"
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
          >
            <div class="node-content" v-html="node.title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Graphs from "@/services/graph";
import { jsPlumb } from "../../node_modules/jsplumb/dist/js/jsplumb";

export default {
  name: "graph-view-groups",
  props: {
    graphId: {
      type: undefined
    },
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      edges: [],
      groups: [],
      pb: null
    };
  },
  mounted() {
    Graphs.detail(this.graphId, {
      view: "jsplumb",
      groupByYear: 1
    })
      .then(res => res.data)
      .then(res => res.data)
      .then(graph => {
        for (let group of graph.groups) {
          for (let node of group.nodes) {
            node["highlight"] = false;
            node["isDependent"] = false;
            node["isSelected"] = false;
          }
        }
        this.edges = graph.edges;
        this.groups = graph.groups;

        // set groups position
        let groupMarginTop = 12;
        let groupCurrPosTop = 0;
        for (let group of this.groups) {
          group.y = groupMarginTop + groupCurrPosTop;
          groupCurrPosTop += groupMarginTop + group.height;
        }

        let cmp = this;

        setTimeout(() => {
          jsPlumb.ready(function() {
            cmp.pb = jsPlumb.getInstance({
              Container: "graph" + cmp.graphId,
              // Connector: ["Flowchart"],
              // Connector: ["Straight"],
              Connector: ["Bezier", { curviness: 20 }],
              Endpoint: ["Blank", { radius: 3 }],
              Overlays: [["Arrow", { location: 1, width: 10, length: 10 }]],
              Anchors: ["Bottom", "Top"]
            });

            cmp.pb.batch(function() {
              for (let group of cmp.groups) {
                cmp.pb.addGroup({
                  el: cmp.$refs[group.id][0],
                  id: group.id,
                  anchor: "Continuous",
                  endpoint: "Blank",
                  constrain: true,
                  droppable: false,
                  draggable: cmp.showEdit
                });
              }

              for (let group of cmp.groups) {
                for (let node of group.nodes) {
                  cmp.pb.draggable("graph" + cmp.graphId + "-" + node.id);
                  cmp.pb.addToGroup(group.id, cmp.$refs[node.id][0]);
                }
              }

              for (let edge of cmp.edges) {
                edge["cssClass"] = "edd";
                edge["source"] = "graph" + cmp.graphId + "-" + edge["source"];
                edge["target"] = "graph" + cmp.graphId + "-" + edge["target"];
                cmp.pb.connect(edge);
              }
            });
          });
        }, 100);
      });
  },

  methods: {
    nodeClick(node) {
      this.clearHighlight();
      this.pb
        .select({
          source: "graph" + this.graphId + "-" + node.id
        })
        .setPaintStyle({
          stroke: "#f39200",
          strokeWidth: 2
        });

      node.isSelected = true;
      this.highlightNodeUp(node);
      this.highlightNodeDown(node);
      this.$emit("clickNode", node);
    },
    clearHighlight() {
      this.pb.select().setPaintStyle({
        stroke: "transparent",
        strokeWidth: 1
      });
      for (let group of this.groups) {
        for (let node of group.nodes) {
          node.isSelected = false;
          node.highlight = false;
          node.isDependent = false;
        }
      }
    },
    getNode(id) {
      id = "node" + id;
      for (let group of this.groups) {
        for (let node of group.nodes) {
          if (node.id == id) {
            return node;
          }
        }
      }
      return undefined;
    },
    highlightNodeUp(node) {
      for (let dependency of node.dependencies) {
        let dep_node = this.getNode(dependency);
        if (dep_node) {
          dep_node.highlight = true;
        }
        this.pb
          .select({
            source: "graph" + this.graphId + "-" + dep_node.id,
            target: "graph" + this.graphId + "-" + node.id
          })
          .setPaintStyle({
            stroke: "#344357",
            strokeWidth: 2
          });
        this.highlightNodeUp(dep_node);
      }
    },
    highlightNodeDown(node) {
      if (node.dependents) {
        for (let dependent of node.dependents) {
          let dep_node = this.getNode(dependent);
          if (dep_node) {
            dep_node.isDependent = true;
          }
        }
      }
    },
    exportPositions() {
      let positions = [];
      for (let group of this.groups) {
        for (let node of group.nodes) {
          positions.push({
            id: parseInt(node.id.replace("node", "")),
            x: parseInt(this.$refs[node.id][0].style.left.replace("px", "")),
            y: parseInt(this.$refs[node.id][0].style.top.replace("px", ""))
          });
        }
      }
      this.$emit("exportPositions", positions);
    }
  }
};
</script>

<style lang="scss" scoped>
.axis-diagram {
  .graphViewGroups {
    position: relative;
    height: 100%;
    // border: 1px solid blue;

    .group {
      position: absolute;
      background: rgba(1, 1, 1, 0.05);
      z-index: 1;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;

      display: flex;

      .group-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        text-align: center;
        background: #344357;
        color: white;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
        writing-mode: sideways-lr;
        text-orientation: mixed;
      }
    }

    .node {
      cursor: pointer;
      z-index: 2;
      position: absolute;
      border: 1px solid #ddd;
      background: white;
      border-radius: 10px;
      font-size: 16px;
      line-height: 18px;
      width: 170px;
      padding: 4px;

      &.node-highlight {
        background: #344357 !important;
        color: white;
      }
      &.node-dependent {
        background: #f39200 !important;
        color: white;
      }
      &.node-current {
        background: #6ee974 !important;
      }

      .node-content {
        padding: 8px;
        text-align: center;
      }
    }
  }
}
</style>