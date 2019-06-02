<template>
  <section class="classificacao pt">
    <div class="container">
      <b-modal :active="selectedSkill !== false" @close="selectedSkill = false">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ selectedSkill.name }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <task-list :tasks="tasks"></task-list>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#!" class="card-footer-item" @click="closeListTasks">Ok, fechar</a>
          </footer>
        </div>
      </b-modal>

      <ul>
        <classification-node
          @openTaskList="listTasks"
          v-for="node of tree"
          :key="node.id"
          :node="node"
          :open="false"
        ></classification-node>
      </ul>
    </div>
  </section>
</template>

<script>
import Skills from "@/services/skill";
import Tasks from "@/services/task";
import ClassificationNode from "./ClassificationNode";
import TaskList from "@/components/TaskList";

export default {
  components: {
    ClassificationNode,
    TaskList
  },
  data() {
    return {
      tree: {},
      selectedSkill: false,
      tasks: []
    };
  },
  mounted() {
    Skills.tree()
      .then(res => res.data)
      .then(tree => (this.tree = tree));
  },
  methods: {
    listTasks(skill) {
      this.selectedSkill = skill;
      Tasks.list({
        skills: [skill.id]
      })
        .then(res => res.data)
        .then(tasks => (this.tasks = tasks));
    },
    closeListTasks() {
      this.selectedSkill = false;
      this.tasks = [];
    }
  }
};
</script>

<style scoped lang="scss">
</style>
