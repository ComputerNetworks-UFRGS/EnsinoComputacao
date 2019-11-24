<template>
  <section class="classificacao classificacao-home pd">
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
            'active-axis':a.id == activeAxis.id
          }"
          @click="setActiveAxis(a)"
        >{{ a.name }}</div>
      </div>
      <div
        v-for="a of axis"
        :key="'content' + a.id"
        class="columns is-marginless is-mobile box-main-content"
        :style="{
          'background-color': a.color,
          'height': a.id == activeAxis.id ? '98%' : '0px',
          'overflow': a.id == activeAxis.id ? 'visible' : 'hidden'
        }"
      >
        <div class="column is-narrow" style="padding: 0px; width: 600px;">
          <graph-view-groups
            v-if="activeAxis"
            :graph-id="a.graph_id"
            class="graph"
            @clickNode="clickNode"
          ></graph-view-groups>
        </div>
        <div class="column is-hidden-mobile">
          <div class="box node-detail">
            <h3 class="title is-3">Eixo {{ activeAxis.name }}</h3>
            <graph-node-detail
              v-if="a.activeNode.id"
              :node="a.activeNode"
              @taskSelected="taskSelected"
            ></graph-node-detail>
            <div v-else>
              <div class="info-message">
                Clique em algum dos Objetos de Aprendizado ao lado para visualizar as
                atividades relacionadas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <menu-side :isOpen="selectedTask > 0" :is-right="true" @close="selectedTask = false">
      <div v-if="selectedTask" class="task-detail-box">
        <task-detail :task-id="selectedTask" class="task-detail-content"></task-detail>
        <div class="task-detail-footer card-footer">
          <a class="card-footer-item" href="#!" @click.prevent="selectedTask = false">
            <span class="icon">
              <font-awesome-icon icon="times" />
            </span>
            <span>Voltar</span>
          </a>
          <router-link :to="'/atividades/' + selectedTask" class="card-footer-item">
            <span>Ver atividade</span>
            <span class="icon">
              <font-awesome-icon icon="angle-right" />
            </span>
          </router-link>
        </div>
      </div>
    </menu-side>
  </section>
</template>

<script>
import _ from "lodash";
import Axis from "@/services/axis";
import AgeGroups from "@/services/age-group";
import GraphNodeDetail from "@/components/GraphNodeDetail";
import GraphViewGroups from "@/components/GraphViewGroups";
import Graphs from "@/services/graph";
import Skills from "@/services/skill";
import TaskList from "@/components/TaskList";
import MenuSide from "@/components/MenuSide";
import TaskDetail from "@/components/TaskDetail";

export default {
  props: {
    startAxis: {
      default: 1
    }
  },
  components: {
    GraphNodeDetail,
    GraphViewGroups,
    TaskList,
    MenuSide,
    TaskDetail
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
      selectedTask: false
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
          for (let a of axis) {
            a["activeNode"] = {};
          }
          this.activeAxis = _.find(axis, a => a.id == this.startAxis);
          this.axis = axis;
        });
    },
    setActiveAxis(axis) {
      this.activeAxis = axis;
    },
    clickNode(node) {
      let id = parseInt(node.id.replace("node", ""));

      if (
        this.activeAxis["activeNode"] &&
        this.activeAxis["activeNode"].id == id
      ) {
        this.activeAxis["activeNode"] = {};
      } else {
        Graphs.nodeDetail(this.activeAxis.graph_id, node.id.replace("node", ""))
          .then(res => res.data)
          .then(nodeDetail => {
            this.activeAxis["activeNode"] = nodeDetail;
          });
      }
    },
    taskSelected(task) {
      this.selectedTask = task.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.axis {
  text-align: center;
  cursor: pointer;
  border: 2px solid transparent;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  line-height: 20px;
  $borderColor: #344357;

  &.active-axis {
    border-top-color: $borderColor;
    border-left-color: $borderColor;
    border-right-color: $borderColor;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;

    &:first-child {
      border-left: transparent;
    }

    &:last-child {
      border-right: transparent;
    }
  }
  &:not(.active-axis) {
    border-bottom-color: $borderColor;
  }
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
.box-main-content {
  background: white;
  height: 98%;
  .node-detail {
    height: calc(100vh - 24px);
    position: sticky;
    top: 12px;
  }
}
.box {
  .title {
    font-family: "Poppins", sans-serif;
    text-align: center;
    color: #344357;
  }
  .info-message {
    font-size: 20px;
    font-family: "Poppins", sans-serif;
    text-align: center;
    padding: 20px;
    line-height: 26px;
  }
}
</style>
<style lang="scss">
.classificacao-home {
  .container {
    height: 4200px;
    background: transparent;
  }
  .card-content {
    padding: 16px;
  }
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    .card-content {
      display: flex;
      flex-grow: 1;
      padding: 1rem;
    }
  }
  .component-sidenav {
    padding: 12px 12px 0px 12px;
    background: white;
    border-left: 4px solid #dddddd;
    width: 70vw !important;
  }
  .task-detail-box {
    display: flex;
    flex-direction: column;
    height: 100%;

    .task-detail-content {
      display: flex;
      flex-grow: 1;
      background: white;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
@media (max-width: 768px) {
  .classificacao-home {
    .component-sidenav {
      width: 100vw !important;
    }
    .list-of-tasks {
      padding: 0px;
      .card-content {
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          .content-text {
            width: 100%;
          }
          .content-footer {
            width: 100%;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
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
      background: #344357;
      color: white;
      font-weight: bold;
      font-family: "Roboto", sans-serif;
    }
  }

  .node {
    background: white !important;
    border-radius: 10px !important;
    font-size: 16px !important;
    line-height: 18px !important;
    width: 200px !important;
    padding: 16px !important;
  }
}
</style>