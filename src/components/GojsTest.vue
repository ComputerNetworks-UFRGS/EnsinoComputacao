<template>
  <div>
    <br>
    <div class="columns">
      <div class="column is-6">
        <div class="columns">
          <div class="column is-6">
            <button
              class="button is-primary is-large is-fullwidth"
              @click="setYearsModeFalse()"
            >Tudo</button>
          </div>
          <div class="column is-6">
            <button class="button is-primary is-large is-fullwidth" @click="setYearsModeTrue()">Anos</button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="grafoTeste"
      style="height: 800px; width: 1800px; border: 0px solid black; display: block; margin: 0 auto"
    ></div>
  </div>
</template>

<script id="sample">
import go, { Transaction } from "../../node_modules/gojs/release/go-debug.js";
import json from "@/assets/data.json";
export default {
  props: {},
  data() {
    return {
      builder: null,
      graph: null,
      nodes: json.nodes,
      edges: json.links,
      yearsMode: false
    };
  },
  methods: {
    buildGraph() {
      var $ = this.builder;

      var grafo = this.graph;

      var nodeDataArray = [];
      var linkDataArray = [];

      var groups = [];

      this.nodes.forEach(node => {
        if (this.yearsMode) {
          var tempNode = {
            key: node.id,
            text: node.content.text,
            color: node.content.color,
            group: node.year
          };
          nodeDataArray.push(tempNode);
          if (groups.indexOf(tempNode.group) === -1) {
            var tempGroup = {
              key: tempNode.group,
              isGroup: true
            };
            nodeDataArray.push(tempGroup);
            groups.push(tempNode.group);
          }
        } else {
          var tempNode = {
            key: node.id,
            text: node.content.text,
            color: node.content.color
          };
          nodeDataArray.push(tempNode);
        }
      });

      grafo.model.linkDataArray = [];

      groups.sort();

      this.edges.forEach(edge => {
        var tempEdge = {
          to: edge.destination,
          from: edge.source
        };
        if (!this.yearsMode) {
          linkDataArray.push(tempEdge);
        } else if (
          nodeDataArray.find(node => node.key === tempEdge.to).group ===
          nodeDataArray.find(node => node.key === tempEdge.from).group
        ) {
          linkDataArray.push(tempEdge);
        }
      });

      for (var i = 0; i < groups.length - 1; i++) {
        var tempEdge = {
          to: groups[i + 1],
          from: groups[i]
        };
        linkDataArray.push(tempEdge);
      }

      grafo.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

      grafo.groupTemplate = $(
        go.Group,
        "Auto",
        {
          selectable: false
        },
        $(
          go.Panel,
          "Auto",
          $(go.Shape, "RoundedRectangle", { fill: "#C3B5FF" }),
          $(go.Placeholder, { padding: 5 }),
          $(go.TextBlock, "Ano", new go.Binding("text", "key"), {
            alignment: new go.Spot(1, 1),
            font: "Normal normal normal 20pt Kreon, serif",
            margin: 5
          })
        ),
        $(go.LayeredDigraphLayout, {
          direction: 90,
          layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
          aggressiveOption: go.LayeredDigraphLayout.AggressiveMore
        })
      );

      if (this.yearsMode) {
        grafo.layout = $(go.TreeLayout, {
          angle: 90
        });
      } else {
        grafo.layout = $(go.LayeredDigraphLayout, {
          direction: 90,
          layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
          aggressiveOption: go.LayeredDigraphLayout.AggressiveMore
        });
      }

      grafo.nodeTemplate = $(
        go.Node,
        "Auto",
        {
          selectable: false,
          deletable: false,
          mouseEnter: this.mouseEnter,
          mouseLeave: this.mouseLeave,
          cursor: "pointer",
          click: this.nodeClicked
        },
        $(
          go.Shape,
          "RoundedRectangle",
          {
            stroke: "#233B30",
            strokeWidth: 2,
            name: "SHAPE"
          },
          new go.Binding("fill", "color")
        ),
        $(
          go.TextBlock,
          "Habilidade",
          {
            margin: 15,
            font: "Normal normal normal 15pt Kreon, serif",
            name: "TEXT"
          },
          new go.Binding("text", "text")
        )
      );
    },
    mouseEnter(e, obj) {
      var shape = obj.findObject("SHAPE");
      shape.fill = "#185137";
      shape.stroke = "#94FACC";
      var text = obj.findObject("TEXT");
      text.stroke = "white";
    },
    mouseLeave(e, obj) {
      var shape = obj.findObject("SHAPE");
      // Return the Shape's fill and stroke to the defaults
      shape.fill = obj.data.color;
      shape.stroke = "#233B30";
      // Return the TextBlock's stroke to its default
      var text = obj.findObject("TEXT");
      text.stroke = "black";
    },
    setYearsModeFalse() {
      this.yearsMode = false;
      this.buildGraph();
    },
    setYearsModeTrue() {
      this.yearsMode = true;
      this.buildGraph();
    },
    nodeClicked(e, obj) {
      var node = obj.part;
      console.log(node.data.key);
      this.$router.push({ name: "tasks" });
    }
  },
  mounted() {
    this.builder = go.GraphObject.make;
    var $ = this.builder;

    var grafo = $(go.Diagram, "grafoTeste", {
      hoverDelay: 15,
      "undoManager.isEnabled": true,
      allowHorizontalScroll: false,
      allowVerticalScroll: false
    });

    this.graph = grafo;
    this.buildGraph();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kreon&display=swap");
</style>
