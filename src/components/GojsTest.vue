<template>
  <div id="grafoTeste" style="height: 750px; width: 1000px; border: 1px solid black;"></div>
</template>

<script id="sample">
import go from "../../node_modules/gojs/release/go-debug.js";
import json from "@/assets/data.json";
export default {
  data() {
    return {
      graph: null,
      nodes: json.nodes,
      edges: json.links
    };
  },
  methods: {},
  mounted() {
    this.graph = go.GraphObject.make;
    var $ = this.graph;

    var grafo = $(go.Diagram, "grafoTeste");

    var nodeDataArray = [];
    var linkDataArray = [];

    this.nodes.forEach(node => {
      var tempNode = {
        key: node.id,
        text: node.content.text,
        color: node.content.color
      };
      nodeDataArray.push(tempNode);
    });

    grafo.model.linkDataArray = [];

    this.edges.forEach(edge => {
      var tempEdge = {
        to: edge.destination,
        from: edge.source
      };
      linkDataArray.push(tempEdge);
    });

    console.log(nodeDataArray, linkDataArray);

    grafo.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

    grafo.layout = $(go.TreeLayout);
    grafo.layout.angle = 90;
    grafo.layout.nodeSpacing = 40;

    grafo.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        "RoundedRectangle",
        { fill: "white" },
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, "text", new go.Binding("text", "text"))
    );
  }
};
</script>

<style></style>
