<template>
  <section class="classificacao-tree pd">
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
            <a href="#!" class="card-footer-item" @click.prevent="closeListTasks">
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
              <span>Voltar</span>
            </a>
          </footer>
        </div>
      </b-modal>

      <div class="columns">
        <div v-for="axis of tree" :key="axis.id" class="column">
          <h5 class="title is-5">{{ axis.name }}</h5>

          <div v-for="object of axis.objects" :key="object.id" class="card">
            <header class="card-header" @click.prevent="object.isOpen = !object.isOpen">
              <p class="card-header-title">{{ object.name }}</p>
              <a href="#!" class="card-header-icon">
                <span class="icon">
                  <i
                    class="fas"
                    :class="{
                    'fa-angle-down': object.isOpen,
                    'fa-angle-right': !object.isOpen,
                  }"
                  ></i>
                </span>
              </a>
            </header>
            <div class="card-content" :class="{'is-hidden': !object.isOpen}">
              <div class="content">
                <div class="has-text-centered">
                  <b>Habilidades desenvolvidas</b>
                </div>
                <br />
                <div class="box" v-for="skill of object.skills" :key="skill.id">
                  {{ skill.name }}
                  <br />
                  <br />
                  <button
                    class="button is-light is-small is-fullwidth"
                    @click="listTasks(skill)"
                  >Ver atividades</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    this.isLoading = true;
    Skills.tree()
      .then(res => res.data)
      .then(stage => {
        for (let a of stage.axis) {
          for (let object of a.objects) {
            object.isOpen = false;
          }
        }
        this.tree = stage.axis;
      })
      .finally(() => {
        this.isLoading = false;
      });
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
.card-header-title {
  font-weight: normal;
}
.box {
  padding: 0.5rem;
  margin-bottom: 0.5rem !important;
  font-size: 0.9rem;
  line-height: 1rem;
}
</style>
<style lang="scss">
.classificacao-tree {
  .modal-content {
    height: 100%;
    .card {
      height: 100%;
      display: flex;
      flex-direction: column;

      .card-content {
        display: flex;
        flex-grow: 1;
        .content {
          width: 100%;
        }
      }

      .content figure {
        margin-left: 0px;
        margin-right: 0px;
      }
    }
  }
}
</style>
