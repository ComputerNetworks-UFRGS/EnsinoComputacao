<template>
  <div>
    <br />
    <div class="columns">
      <div class="column is-6">
        <div class="columns">
          <div class="column is-1"></div>
          <div class="column is-2">
            <button class="button is-primary is-large" @click="setYearsModeFalse()">Tudo</button>
          </div>
          <div class="column is-2">
            <years-dropdown @selectYear="selectYear" />
          </div>
          <div class="column is-2">
            <button class="button is-primary is-large" @click="filtersModal = true">Filtrar</button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="grafoTeste"
      style="height: 800px; width: 1800px; border: 0px solid black; display: block; margin: 0 auto"
    ></div>
    <modal-graph-filters
      v-if="filtersModal"
      :show="filtersModal"
      :inputFilters="filters"
      @close="CloseFiltersModal"
    />
  </div>
</template>

<script id="sample">
import go, { Transaction } from "../../node_modules/gojs/release/go-debug.js";
import Graph from "@/services/graph";
import json from "@/assets/data.json";
import YearsDropdown from "@/components/YearsDropdown.vue";
import ModalGraphFilters from "@/components/ModalGraphFilters.vue";
export default {
  components: {
    YearsDropdown,
    ModalGraphFilters
  },
  props: {},
  data() {
    return {
      builder: null,
      graph: null,
      nodes: [],
      edges: [],
      selectedYear: -1,
      filters: {
        years: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        axis: ["1", "2", "3"],
        separateYears: false
      },
      filtersModal: false,
      isLoading: false
    };
  },
  methods: {
    buildGraph() {
      var $ = this.builder;

      var grafo = this.graph;

      var rawNodes;
      var rawEdges;

      this.isLoading = true;

      Graph.list()
        .then(res => res.data)
        .then(nodes => (rawNodes = nodes))
        .then(links => (rawEdges = links))
        .finally(() => {
          this.isLoading = false;
        });

      console.log(rawNodes, rawEdges);

      rawNodes = json.nodes;
      rawEdges = json.links;

      var filteredGraph = this.ApplyFilters(rawNodes, rawEdges);

      this.nodes = filteredGraph.nodes;
      this.edges = filteredGraph.edges;

      grafo.model = new go.GraphLinksModel(this.nodes, this.edges);

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
        ),
        $(go.TextBlock, "Ano", new go.Binding("text", "year"), {
          alignment: new go.Spot(1, 1),
          font: "Normal normal normal 10pt Kreon, serif",
          margin: 2
        })
      );

      grafo.linkTemplate = $(
        go.Link,
        $(go.Shape, { strokeWidth: 1.5 }),
        $(go.Shape, { toArrow: "Standard" }),
        new go.Binding("opacity", "opacity")
      );
    },
    mouseEnter(e, obj) {
      var shape = obj.findObject("SHAPE");
      shape.fill = "#185137";
      shape.stroke = "#94FACC";
      var text = obj.findObject("TEXT");
      text.stroke = "white";
      obj.findLinksConnected().each(function(link) {
        if (link.data.differentGroups) {
          link.opacity = 0.5;
        }
      });
    },
    mouseLeave(e, obj) {
      var shape = obj.findObject("SHAPE");
      // Return the Shape's fill and stroke to the defaults
      shape.fill = obj.data.color;
      shape.stroke = "#233B30";
      // Return the TextBlock's stroke to its default
      var text = obj.findObject("TEXT");
      text.stroke = "black";
      obj.findLinksConnected().each(function(link) {
        if (link.data.differentGroups) {
          link.opacity = 0.0;
        }
      });
    },
    setYearsModeFalse() {
      this.filters.years = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ];
      this.filters.separateYears = false;
      this.filters.axis = ["1", "2", "3"];
      this.buildGraph();
    },
    nodeClicked(e, obj) {
      var node = obj.part;
      this.$emit("nodeClicked", node.data.key);
    },
    selectYear(year) {
      if (year === 0) {
        this.filters.separateYears = true;
      } else {
        this.filters.separateYears = false;
        this.filters.years = [year.toString()];
        this.selectedYear = year;
      }
      this.buildGraph();
    },
    ApplyFilters(rawNodes, rawLinks) {
      var nodeDataArray = [];
      var linkDataArray = [];

      var groups = [];

      rawNodes.forEach(node => {
        var tempNode = {
          key: node.id,
          text: node.content.text,
          color: node.content.color,
          year: node.year,
          group: node.year
        };
        if (this.filters.years.indexOf(tempNode.year.toString()) != -1) {
          nodeDataArray.push(tempNode);
          if (this.yearsMode) {
            if (groups.indexOf(tempNode.group) === -1) {
              var tempGroup = {
                key: tempNode.group,
                isGroup: true
              };
              nodeDataArray.push(tempGroup);
              groups.push(tempNode.group);
            }
          }
        }
      });

      groups.sort();

      rawLinks.forEach(edge => {
        if (
          nodeDataArray.find(node => node.key === edge.destination) &&
          nodeDataArray.find(node => node.key === edge.source)
        ) {
          var tempEdge = {
            to: edge.destination,
            from: edge.source,
            differentGroups: false,
            opacity: 1.0
          };
          if (!this.yearsMode) {
            linkDataArray.push(tempEdge);
          } else {
            linkDataArray.push(tempEdge);
            if (
              nodeDataArray.find(node => node.key === tempEdge.to).group !=
              nodeDataArray.find(node => node.key === tempEdge.from).group
            ) {
              tempEdge.differentGroups = true;
              tempEdge.opacity = 0.0;
            }
          }
        }
      });

      for (var i = 0; i < groups.length - 1; i++) {
        var tempEdge = {
          to: groups[i + 1],
          from: groups[i]
        };
        linkDataArray.push(tempEdge);
      }

      var grafo = {
        nodes: nodeDataArray,
        edges: linkDataArray
      };

      return grafo;
    },
    CloseFiltersModal(filters) {
      this.filters.years = filters.selectedYears;
      this.filters.axis = filters.selectedAxis;
      this.filters.separateYears = filters.separateYears;

      this.filtersModal = false;
      this.buildGraph();
    }
  },
  computed: {
    yearsMode() {
      if (this.filters.separateYears) {
        return true;
      } else {
        return false;
      }
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
