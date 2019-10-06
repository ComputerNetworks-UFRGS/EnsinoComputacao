<template>
    <div class="axis-diagram">
        <button @click="exportPositions()">Export</button>
        <div id="graph-view">
            <div class="node" v-for="node of nodes" :key="node.id" :id="node.id" :ref="node.id" :class="{
                            'node-highlight': node.highlight,
                            'node-dependent': node.isDependent,
                            'node-current': node.isSelected
                        }" :style="{
                            'top': node.y,
                            'left': node.x
                        }" @click="nodeClick(node)" @mouseover="nodeMouseover(node)" @mouseleave="nodeMoueleave(node)">
                <div class="node-content" v-html="node.title"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Graphs from "@/services/graph";
import { jsPlumb } from "../../node_modules/jsplumb/dist/js/jsplumb";

export default {
    name: 'graph-view',
    data() {
        return {
            edges: [],
            nodes: [],
            pb: null
        };
    },
    mounted() {

        Graphs.detail(1, {
                view: "jsplumb",
                groupByYear: 0,
            })
            .then(res => res.data)
            .then(res => res.data)
            .then(graph => {
                for (let node of graph.nodes) {
                    node["highlight"] = false;
                    node["isDependent"] = false;
                    node["isSelected"] = false;
                }
                this.edges = graph.edges;
                this.nodes = graph.nodes

                let cmp = this;

                setTimeout(() => {
                    jsPlumb.ready(function() {
                        cmp.pb = jsPlumb.getInstance({
                            Container: "graph-view",
                            // Connector: ["Flowchart"],
                            // Connector: ["Straight"],
                            Connector: ["Bezier", { curviness: 30 }],
                            Endpoint: ["Blank", { radius: 3 }],
                            Overlays: [
                                ["Arrow", { location: 1, width: 8, length: 8 }]
                            ],
                            Anchors: ["Bottom", "Top"]
                        });

                        cmp.pb.batch(function() {

                            for (let node of cmp.nodes) {
                                cmp.pb.draggable(node.id);
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
            for (let node of this.nodes) {
                node.isSelected = false;
                node.highlight = false;
                node.isDependent = false;
            }
        },
        getNode(id) {
            for (let node of this.nodes) {
                if (node.id == id) {
                    return node
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

            for (let node of this.nodes) {
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

<style lang="scss" scoped>
.axis-diagram {
    #graph-view {
        position: relative;
        height: 100%;
        border: 1px solid blue;
        .group {
            position: absolute;
            background: rgba(1, 1, 1, 0.5);
            border: 1px solid red;
        }
        .node {
            position: absolute;
            border: 1px solid #ddd;
            cursor: pointer;
            border-radius: 20px;
            width: auto;
            max-width: 200px;
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