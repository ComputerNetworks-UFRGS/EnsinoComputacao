<template>
  <div class="graphContainer" :style="{'width':width+'px'}">
    <Diagram
      :width="width"
      :height="height"
      :scale="this.scale"
      background="#ffffff"
      :nodes="nodes"
      :links="edges"
    ></Diagram>
  </div>
</template>

<script>
// import Diagram from "@/components/Diagram.vue";
import Diagram from "diagram-vue";
import json from "@/assets/data.json";

export default {
  name: "graph",
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  components: {
    Diagram
  },
  data() {
    return {
      nodes: [],
      edges: [],
      scale: "1"
    };
  },
  methods: {
    buildGraph(nodes, edges) {
      var metaNodes = [];
      var width = this.width;
      var height = this.height;

      var graph = {};

      //Encontrando nodos de nível 0
      nodes.forEach(node => {
        var tempMetaNode = {
          level: 0,
          node: node
        };

        edges.forEach(edge => {
          if (edge.destination === node.id) {
            tempMetaNode.level++;
          }
        });

        if (tempMetaNode.level === 0) {
          metaNodes.push(tempMetaNode);
        }
      });

      //Cálculo do nível de cada nodo
      var metaNode = null;
      for (var i = 0; i < metaNodes.length; i++) {
        metaNode = metaNodes[i];
        edges.forEach(edge => {
          if (edge.source === metaNode.node.id) {
            var tempMetaNode = {
              level: 0,
              node: nodes.find(child => edge.destination === child.id)
            };

            tempMetaNode.level = metaNode.level + 1;
            var index = metaNodes.findIndex(
              node => node.node.id === tempMetaNode.node.id
            );

            if (index === -1) {
              metaNodes.push(tempMetaNode);
            } else if (metaNodes[index].level < tempMetaNode.level) {
              this.updateLevel(
                metaNodes[index],
                tempMetaNode.level - 1,
                metaNodes,
                edges
              );
            }
          }
        });
      }

      //Definição de número de blocos por linha, i.e. quantos nodos estarão em cada linha
      var levels = [];
      metaNodes.forEach(metaNode => {
        if (levels.findIndex(level => level === metaNode.level) === -1) {
          levels.push(metaNode.level);
        }
      });
      var blocks = [];
      for (i = 0; i < levels.length; i++) {
        blocks.push(0);
      }
      metaNodes.forEach(metaNode => {
        blocks[metaNode.level]++;
      });

      //Cálculo da posição e tamanho dos nodos
      metaNodes.sort(this.compare);
      var numPreviousBlocks = 0;
      var blockSize = 0;
      for (i = 0; i < blocks.length; i++) {
        for (var j = 0; j < metaNodes.length; j++) {
          metaNode = metaNodes[j];
          if (metaNode.level === i) {
            //console.log("width", width);
            //console.log("blocks[metaNode.level]", blocks[metaNode.level]);
            //console.log("metaNode.level", metaNode.level);
            blockSize = width / blocks[metaNode.level];
            metaNode.node.point.x =
              blockSize * (j - numPreviousBlocks) + blockSize / 4;
            metaNode.node.point.y = metaNode.level * (height / levels.length);
            metaNode.node.height = 75;
            metaNode.node.width = blockSize - 0.25 * blockSize;
            if (metaNode.node.width > metaNode.node.content.text.length * 13) {
              metaNode.node.width = metaNode.node.content.text.length * 13;
            }
            //Inserção de quebra de linha quando o texto é maior que o bloco
            if (
              metaNode.node.content.text.length * 13 >
              blockSize - 0.25 * blockSize
            ) {
              var maxLetters = Math.round((blockSize - 0.25 * blockSize) / 13);
              var stop = false;
              var index = 0;
              var done = false;
              var newText = metaNode.node.content.text.slice(0);
              //console.log(maxLetters);
              while (!stop) {
                index = index + maxLetters;
                console.log(index, newText.length - 1);
                if (index >= newText.length - 1) {
                  console.log(index, " maior que ", newText.length - 1);
                  stop = true;
                } else {
                  done = false;
                  while (!done) {
                    if (index === 0) done = true;
                    console.log(index, newText[index]);
                    if (newText[index] === " " || newText[index] === "\n") {
                      if (newText[index] != "\n") {
                        newText =
                          newText.slice(0, index) +
                          "\n" +
                          newText.slice(index + 1, newText.length);
                      }
                      done = true;
                    } else index--;
                  }
                }
              }
              metaNode.node.content.text = newText;
            }

            var tempText = metaNode.node.content.text;
            var lastBreak = 0;
            var content = {
              text: metaNode.node.content.text,
              color: metaNode.node.content.color,
              url: metaNode.node.content.url,
              lines: []
            };

            metaNode.node.content = content;

            for (var k = 0; k < tempText.length; k++) {
              var line = {
                text: [],
                anchor: ""
              };
              if (tempText[k] === "\n") {
                line.text = tempText.substring(lastBreak, k - 1);

                metaNode.node.content.lines.push(line);
                lastBreak = k + 1;
              }
              if (k === tempText.length - 1) {
                line.text = tempText.substring(lastBreak, k + 1);

                metaNode.node.content.lines.push(line);
              }
            }

            var anchor = 0;
            //Cálculo do posicionamento do texto dentro do nodo de acordo com o número de linhas
            if (metaNode.node.content.lines.length === 1) {
              metaNode.node.content.lines[0].anchor = "58%";
            } else {
              for (var w = 0; w < metaNode.node.content.lines.length; w++) {
                anchor =
                  (-10 * metaNode.node.content.lines.length + 60) * (w + 1);
                metaNode.node.content.lines[
                  w
                ].anchor = anchor.toString().concat("%");
              }
            }
          }
        }
        numPreviousBlocks = numPreviousBlocks + blocks[i];
      }

      //Cálculo das posições das arestas
      var source = null;
      var destination = null;
      edges.forEach(edge => {
        source = nodes.find(node => node.id === edge.source);
        destination = nodes.find(node => node.id === edge.destination);
        edge.point.x = (source.point.x + destination.point.x) / 2 + 100;
        edge.point.y = (source.point.y + destination.point.y) / 2;
      });

      graph = {
        nodes: nodes,
        edges: edges
      };

      return graph;
    },
    updateLevel(node, parentLevel, metaNodes, edges) {
      node.level = parentLevel + 1;
      metaNodes.forEach(metaNode => {
        edges.forEach(edge => {
          if (
            edge.destination === metaNode.node.id &&
            edge.source === node.node.id
          ) {
            this.updateLevel(metaNode, node.level, metaNodes, edges);
          }
        });
      });
      return 1;
    },
    compare(meta1, meta2) {
      if (meta1.level < meta2.level) return -1;
      if (meta1.level > meta2.level) return 1;
      return 0;
    }
  },

  mounted() {
    var nodes = json.nodes;
    var edges = json.links;

    var graph = this.buildGraph(nodes, edges);

    this.nodes = graph.nodes;
    this.edges = graph.edges;
  }
};
</script>

<style>
.graphContainer {
  display: block;
  margin: 0 auto;
}
.shadow text {
  white-space: pre-line;
  transform: translateY(-40%);
  line-height: 20px;
}
.shadow {
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
  -webkit-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
  -moz-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
  box-shadow: 0px 50px 100px 0px rgba(0, 0, 102, 0.1);
}
</style>
