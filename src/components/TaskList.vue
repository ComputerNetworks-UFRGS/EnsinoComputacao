<template>
  <div class="component-task-list">
    <div class="columns">
      <div class="column" v-if="tasks.length > 0">
        <div class="columns is-multiline">
          <div
            class="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen"
            v-for="task of tasks"
            :key="task.id"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-2by1">
                  <img
                    src="https://bulma.io/images/placeholders/640x320.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="content">
                  <div class="content-text">{{ task.title }}</div>
                  <div class="content-footer"></div>
                </div>
              </div>

              <footer class="card-footer">
                <a href="#!" @click.prevent="selectTask(task)" class="card-footer-item">Detalhes</a>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <div class="column" v-else>Nenhuma atividade encontrada com este filtro.</div>
    </div>

    <menu-side
      :isOpen="selectedTask > 0"
      :is-right="true"
      :width="'80vh'"
      @close="selectedTask = false"
    >
      <div v-if="selectedTask">
        <task-detail :task-id="selectedTask"></task-detail>
        <router-link :to="'/atividades/' + selectedTask" class="card-footer-item">Detalhes</router-link>
      </div>
    </menu-side>
  </div>
</template>

<script>
import MenuSide from "@/components/MenuSide";
import TaskDetail from "@/components/TaskDetail";

export default {
  name: "task-list",
  props: {
    tasks: Array
  },
  components: {
    MenuSide,
    TaskDetail
  },
  data() {
    return {
      selectedTask: false
    };
  },
  methods: {
    selectTask(task) {
      this.selectedTask = task.id;
    }
  }
};
</script>

<style lang="scss">
.component-task-list {
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
    padding: 12px;
    background: white;
    border-left: 4px solid #dddddd;
  }
}
</style>
