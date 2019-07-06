<template>
  <section class="habilidades pt">
    <b-modal :active="selectedSkill !== false" @close="selectedSkill = false">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ selectedSkill.habilidade_nome }}</p>
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

    <div class="container">
      <skill-List :years="years" @click="listTasks"></skill-List>
    </div>
  </section>
</template>

<script>
import Skills from "@/services/skill";
import TaskList from "@/components/TaskList";
import SkillList from "@/components/SkillList";
import Tasks from "@/services/task";

export default {
  components: {
    TaskList,
    SkillList
  },
  data() {
    return {
      years: {},
      selectedSkill: false,
      tasks: []
    };
  },
  mounted() {
    Skills.years()
      .then(res => res.data)
      .then(years => {
        this.years = years
      });
  },
  methods: {
    listTasks(skill) {
      this.selectedSkill = skill;
      Tasks.list({
        skills: [skill.habilidade_id]
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
