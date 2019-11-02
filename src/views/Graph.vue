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
              :is-vertical="false"
            ></dependency-highlight>
          </div>
          <div v-if="currentMode == 'gojs'">
            <div class="graph-box"  v-if="graph && graph.id">
                <graph-view-groups 
                    v-if="graph.group_by_year"
                    :graph-id="graph.id"></graph-view-groups>
                
                <graph-view 
                    v-if="!graph.group_by_year"
                    :graph-id="graph.id"></graph-view>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Graphs from "@/services/graph";
import DependencyHighlight from "@/components/DependencyHighlight";
import GraphViewGroups from "@/components/GraphViewGroups";
import GraphView from "@/components/GraphView";

export default {
  components: {
    DependencyHighlight,
    GraphViewGroups,
    GraphView
  },
  data() {
    return {
      tasksModal: false,
      graph: {},
      viewModes: [
        { key: "steps", label: "Pré-requisitos" },
        // { key: "gojs", label: "Hierarquia" },
        // { key: "years", label: "Por ano" }
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
    openModal(node) {
      console.log('id', node)
      this.tasksModal = true;
    },
    closeModal() {
      this.tasksModal = false;
    }
  }
};
</script>
<style scoped lang="scss">
.graph-box {
  min-height: 1000px;
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 12px;
}
</style>
