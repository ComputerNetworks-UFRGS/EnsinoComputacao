<template>
  <div class="component-task-list">
    <div class="columns">
      <div class="column" v-if="tasks.length > 0">
        <div class="columns is-multiline">

          <div
            class="column list-of-tasks"
            :class="{
              'is-12-mobile is-6-tablet is-4-desktop is-4-widescreen': !isMobile,
              'is-6': isMobile
            }"
            v-for="task of tasks"
            :key="task.id"
          >
            <div class="card">
              <div class="card-image is-hidden-mobile">
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
                  <div class="content-footer is-hidden-tablet">
                    <button @click.prevent="selectTask(task)" class="button button is-light">
                      <span>Ver</span>
                      <span class="icon">
                        <i class="fas fa-angle-right"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <footer class="card-footer is-hidden-mobile">
                <a
                  href="#!"
                  @click.prevent="selectTask(task)"
                  class="card-footer-item"
                >Mais informações</a>
              </footer>
            </div>
          </div>
        </div>
        <b-pagination
          v-if="paginated && pagination.total > pagination.per_page"
          :total="pagination.total"
          :current.sync="pagination.current_page"
          :order="'is-centered'"
          :simple="false"
          :per-page="pagination.per_page"
          @change="$emit('changePage', $event)"
        ></b-pagination>
      </div>
      <div class="column" v-else>
        <h5 class="title is-5">Nenhuma atividade encontrada.</h5>
        <!-- <h6 class="subtitle is-6">Tente utilizar outros filtros.</h6> -->
      </div>
    </div>

    <menu-side :isOpen="selectedTask > 0" :is-right="true" @close="selectedTask = false">
      <div v-if="selectedTask" class="task-detail-box">
        <task-detail :task-id="selectedTask" class="task-detail-content"></task-detail>
        <div class="task-detail-footer card-footer">
          <a class="card-footer-item" href="#!" @click.prevent="selectedTask = false">
            <span class="icon">
              <i class="fas fa-times"></i>
            </span>
            <span>Voltar</span>
          </a>
          <router-link :to="'/atividades/' + selectedTask" class="card-footer-item">
            <span>Ver atividade</span>
            <span class="icon">
              <i class="fas fa-angle-right"></i>
            </span>
          </router-link>
        </div>
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
    tasks: Array,
    isMobile: {
      type: Boolean,
      default: false
    },
    customTaskView: {
      type: Boolean,
      default: false
    },
    paginated: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: undefined,
      default: {}
    }
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
      if (this.customTaskView) {
        this.$emit("taskSelected", task);
      } else {
        this.selectedTask = task.id;
      }
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
    padding: 12px 12px 0px 12px;
    background: white;
    border-left: 4px solid #dddddd;
    width: 70vw !important;
  }
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
@media (max-width: 768px) {
  .component-task-list {
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
</style>
