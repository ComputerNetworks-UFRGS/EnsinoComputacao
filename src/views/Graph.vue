<template>
  <section class="graph-page">
    <div class="container">
      <div class="columns">
        <div class="column is-12">
          <br />
          <br />
          <h5 class="title is-5 has-text-centered">{{ graph.title }}</h5>

          <div class="buttons has-addons is-centered">
            <a
              v-for="viewMode of viewModes"
              :key="viewMode.key"
              href="#!"
              @click.prevent="currentMode = viewMode.key"
              class="button is-light"
              :class="{'is-active': currentMode == viewMode.key}"
            >{{ viewMode.label }}</a>
          </div>
          <div v-if="currentMode == 'steps'">
            <dependency-highlight
              v-if="graph && graph.id"
              key="steps"
              :view-mode="'steps'"
              :graph-id="graph.id"
              :is-vertical="true"
            ></dependency-highlight>
          </div>
          <div v-if="currentMode == 'gojs'">
            <ModalTasks :show="tasksModal" @close="closeModal"></ModalTasks>
            <GojsTest @nodeClicked="openModal"></GojsTest>
          </div>
          <div v-if="currentMode == 'years'">
            <dependency-highlight
              v-if="graph && graph.id"
              key="years"
              :view-mode="'years'"
              :graph-id="graph.id"
            ></dependency-highlight>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Graphs from "@/services/graph";
import DependencyHighlight from "@/components/DependencyHighlight";
import GojsTest from "@/components/GojsTest";
import ModalTasks from "@/components/ModalTasks";

export default {
  components: {
    DependencyHighlight,
    GojsTest,
    ModalTasks
  },
  data() {
    return {
      tasksModal: false,
      graph: {},
      viewModes: [
        { key: "steps", label: "Pré-requisitos" },
        { key: "gojs", label: "Hierarquia" },
        { key: "years", label: "Por ano" }
      ],
      currentMode: "steps"
    };
  },
  mounted() {
    Graphs.detail(this.$route.params.id)
      .then(res => res.data)
      .then(graph => {
        this.graph = graph;
      });
  },
  methods: {
    openModal(id) {
      this.tasksModal = true;
    },
    closeModal() {
      this.tasksModal = false;
    }
  }
};
</script>

