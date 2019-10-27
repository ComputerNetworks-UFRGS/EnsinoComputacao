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
      <div class="columns is-marginless is-mobile">
        <div
          v-for="a of axis"
          :key="'content' + a.id"
          v-show="a.id == activeAxis.id"
          class="column is-narrow"
          style="padding: 0px; width: 800px;"
        >
          <graph-view-groups class="graph" v-if="activeAxis" :graph-id="a.graph_id"></graph-view-groups>
        </div>
        <div class="column">
          <h1>asdad</h1>
          <p>
            a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />a sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsidewa
            ysdaa sdlkas dkla sdsidewa ysdaa sdlkas dkla sdsi
            dewa ysdaa sdlkas dkla sdsidewa ysda
            <br />
          </p>
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
import GraphViewGroups from "@/components/GraphViewGroups";
import TaskList from "@/components/TaskList";
import Tasks from "@/services/task";

export default {
  components: {
    GraphViewGroups,
    TaskList
  },
  data() {
    return {
      years: [],
      axis: [],
      tasks: [],
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
      activeAxis: false
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
          this.activeAxis = _.head(axis);
          // this.fetchGraph(this.activeAxis.graph_id)
          this.axis = axis;
        });
    },
    setActiveAxis(axis) {
      this.activeAxis = axis;
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
    background: white!important;
    border-radius: 4px!important;
    max-width: 200px !important;
  }

  // .group-nodes, .group-title {
  // background: red!important;
  // }
}
</style>