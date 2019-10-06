<template>
  <div class="axis-diagram">
    <button class="button is-info" @click="exportPositions()">Salvar posições</button>
    <div id="graphViewGroups">
      <div 
        class="group" 
        v-for="group of groups" 
        :id="group.id" 
        :key="group.id"
        :ref="group.id"
        :style="{
          'top': group.y + 'px',
          'left': group.x + 'px',
          'height': group.height + 'px',
          'width': group.width + 'px'
        }">        
          <h1>{{ group.title }}</h1>
          <!-- <button @click="group.width += 10">+w</button>
          <button @click="group.width -= 10">-w</button>
          <button @click="group.height += 10">+h</button>
          <button @click="group.height -= 10">-h</button> -->

          <div
            class="node"
            v-for="node of group.nodes"
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
    </div>    
  </div>
</template>
<script>
import Graphs from "@/services/graph";
import { jsPlumb } from "../../node_modules/jsplumb/dist/js/jsplumb";

export default {
  name: 'graph-view-groups',
  props: ['graphId'],
  data() {
    return {
      edges: [],
      groups: [],
      pb: null
    };
  },
  mounted() {

    Graphs.detail(8, {
      view: "jsplumb",
      groupByYear: 1,
      groupByStep: 0, // TODO: ...
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
        this.groups = graph.groups

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
              Container: "graphViewGroups",
              // Connector: ["Flowchart"],
              // Connector: ["Straight"],
              Connector: ["Bezier", { curviness: 30 }],
              Endpoint: ["Blank", { radius: 3 }],
              Overlays: [["Arrow", { location: 1, width: 8, length: 8 }]],
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
                  draggable: true,
                });
              }

              for (let group of cmp.groups) {
                for (let node of group.nodes) {
                  cmp.pb.draggable(node.id);
                  cmp.pb.addToGroup(group.id, cmp.$refs[node.id][0]);
                }
              }

              for (let edge of cmp.edges) {
                edge["cssClass"] = "edd";
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
      for (let group of this.groups) {
        for (let node of group.nodes) {
          node.isSelected = false;
          node.highlight = false;
          node.isDependent = false;
        }
      }
    },
    getNode(id) {
      for(let group of this.groups) {
        for(let node of group.nodes) {
          if(node.id == id) {
            return node
          }
        } 
      }
      return undefined
    },
    highlightNodeUp(node) {
      for (let dependency of node.dependencies) {
        let dep_node = this.getNode("node" + dependency)
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
          let dep_node = this.getNode("node" + dependent)
          if (dep_node && (true || dep_node.step == parseInt(dep_node.step) + 1)) {
            dep_node.isDependent = true;
          }
        }
      }
    },
    exportPositions() {
      let positions = []
      for(let group of this.groups) {
        for (let node of group.nodes) {
          positions.push({
            id: parseInt(node.id.replace('node', '')),
            x: parseInt(this.$refs[node.id][0].style.left.replace('px', '')),
            y: parseInt(this.$refs[node.id][0].style.top.replace('px', ''))
          })
        }
      }
      this.$emit('exportPositions', positions);
    },
  }
};
</script>

<style lang="scss" scoped>

.axis-diagram {

  #graphViewGroups {
    position: relative;
    height: 100%;
    // border: 1px solid blue;

    .group {
      position: absolute;
      background: rgba(1,1,1,0.5);
      // border: 1px solid red;
      z-index: 1;
    }

    .node {
      z-index: 2;
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
}
</style>