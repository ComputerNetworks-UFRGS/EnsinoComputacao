<template>
  <section class="classificacao pd">
    <div class="container is-widescreen">
      <div class="columns is-marginless is-mobile">
        <div
          class="column is-4 axis center-vertical-text"
          v-for="a of axis"
          :key="'header' + a.id"
          :style="{
              'background-color': a.color,
            }"
          :class="{
              'active-axis': a.id == activeAxis.id,
            }"
          @click="setActiveAxis(a)"
        >{{ a.name }}</div>
      </div>
      <div
        v-for="a of axis"
        :key="'content' + a.id"
        class="columns is-marginless is-mobile"
        v-show="a.id == activeAxis.id"
      >
        <div class="column is-narrow" style="padding: 0px; width: 800px;">
          <graph-view-groups
            v-if="activeAxis"
            :graph-id="a.graph_id"
            class="graph"
            @clickNode="clickNode"
          ></graph-view-groups>
        </div>
        <div class="column">
          <graph-node-detail v-if="activeAxis" :node="activeAxis.activeNode"></graph-node-detail>
          <div v-else>Selecione um nodo do grafo</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import _ from "lodash";
import Axis from "@/services/axis";
import Skills from "@/services/skill";
// import Graphs from "@/services/graph";
import AgeGroups from "@/services/age-group";
import GraphNodeDetail from "@/components/GraphNodeDetail";
import GraphViewGroups from "@/components/GraphViewGroups";
import TaskList from "@/components/TaskList";
import Graphs from "@/services/graph";

export default {
  components: {
    GraphNodeDetail,
    GraphViewGroups,
    TaskList
  },
  data() {
    return {
      years: [],
      axis: [],
      selectedSkill: false,
      ageGroups: [
        {
          key: "AI",
          label: "Anos Iniciais",
          years: ["01", "02", "03", "04", "05"]
        },
        {
          key: "AF",
          label: "Anos Finais",
          years: ["06", "07", "08", "09"]
        },
        {
          key: "EM",
          label: "Ensino Médio",
          years: ["EM"]
        }
      ],
      activeAxis: false,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      Axis.list()
        .then(res => res.data)
        .then(axis => {
          for(let a of axis) {
            a['activeNode'] = {}
          }
          this.activeAxis = _.head(axis);
          this.axis = axis;
        });
    },
    setActiveAxis(axis) {
      this.activeAxis = axis;
    },
    clickNode(node) {
      Graphs.nodeDetail(this.activeAxis.graph_id, node.id.replace("node", ""))
        .then(res => res.data)
        .then(nodeDetail => {
          console.log('detail', nodeDetail)
          this.activeAxis['activeNode'] = nodeDetail;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.axis {
  text-align: center;
  cursor: pointer;
}
.year {
  display: flex;
  justify-content: center;
  align-items: stretch;
  .text {
    writing-mode: sideways-lr;
    text-orientation: mixed;
    text-align: center;
  }
}
.year-block {
  height: 214px;
}
.active-axis {
  background: rgba(0, 0, 0, 0.4) !important;
  color: white;
}
</style>
<style lang="scss">
.classificacao {
  .container {
    height: 2200px;
    // border: 1px solid red;
    background: rgba(0, 0, 0, 0.4) !important;
  }
}
.graph {
  .group {
    display: flex;

    .group-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      writing-mode: sideways-lr;
      text-orientation: mixed;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: white;
    }
  }

  .node {
    background: white !important;
    border-radius: 4px !important;
    max-width: 200px !important;
  }

  // .group-nodes, .group-title {
  // background: red!important;
  // }
}
</style>