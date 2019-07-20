<template>
  <section class="classificacao pd">
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
        <li v-for="axis of tree" :key="axis.id">
          <b>Eixo:</b>
          {{ axis.name }}
          <ul style="padding-left: 20px;">
            <li v-for="object of axis.objects" :key="object.id">
              <b>Objeto:</b>
              {{ object.name }}
              <ul style="padding-left: 20px;">
                <li v-for="skill of object.skills" :key="skill.id" @click="listTasks(skill)">
                  <b>Habilidade:</b>
                  {{ skill.name }}
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </section>
</template>

<script>
import Skills from "@/services/skill";
import Tasks from "@/services/task";
import TaskList from "@/components/TaskList";

export default {
  components: {
    TaskList
  },
  data() {
    return {
      isLoading: false,
      tree: {},
      selectedSkill: false,
      tasks: []
    };
  },
  mounted() {
    this.isLoading = true
    Skills.tree()
      .then(res => res.data)
      .then(stage => (this.tree = stage.axis))
      .finally(() => {
        this.isLoading = false
      })
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
