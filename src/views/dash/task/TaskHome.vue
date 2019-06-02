<template>
  <div>
    <br>
    <router-link
      v-auth="'task.create'"
      to="/dash/atividades/criar"
      class="button is-success is-pulled-right"
    >Criar nova atividade</router-link>
    <h4 class="title is-4">Suas atividades</h4>

    <div class="card">
      <div class="card-content">
        <div class="columns task-list" v-for="task of orderedTasks" :key="task.id">
          <div class="column is-8 nowrap-text">
            <b>{{ task.title }}</b>&nbsp;
            <br>
            <span
              class="tag is-small"
              :class="getColorLabel(task.status)"
            >{{ getStatusLabel(task.status) }}</span>
          </div>
          <div class="column">
            <div class="field has-addons is-pulled-right">
              <p class="control">
                <button
                  v-if="canPublish(task)"
                  v-auth="'task.edit'"
                  @click="publish(task)"
                  class="button is-link is-small is-sucess"
                >
                  <span v-if="task.status == 5">Publicar nova versão</span>
                  <span v-else>Publicar</span>
                </button>
              </p>
              <p class="control">
                <router-link
                  :to="'/atividades/' + task.id"
                  v-if="task.status == 4"
                  class="button is-link is-small"
                >Ver no site</router-link>
              </p>
              <p class="control">
                <router-link
                  v-auth="'task.detail'"
                  :to="'/dash/atividades/editar/' + task.id"
                  class="button is-small"
                >Editar</router-link>
              </p>
              <p class="control">
                <router-link
                  v-auth="'task.detail'"
                  :to="'/dash/atividades/anexos/' + task.id"
                  class="button is-small"
                >Anexos
                </router-link>
              </p>
            </div>
            <div class="btn-group"></div>
          </div>
        </div>
      </div>
    </div>

    <modal-comment
      :title="'Comentário para revisor'"
      :show.sync="isOpenCommentModal"
      @comment="makeComment($event)"
    ></modal-comment>
  </div>
</template>

<script>
import UserTasks from "@/services/user-task"
import Reviews from "@/services/review"
import UseService from "@/services/user"
import _ from "lodash"
import ModalComment from "@/components/ModalComment"

export default {
  components: {
    ModalComment
  },
  data() {
    return {
      tasks: [],
      isOpenCommentModal: false,
      selectedTask: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      UserTasks.list()
        .then(res => res.data)
        .then(tasks => {
          this.tasks = tasks;
        });
    },
    canPublish(task) {
      return UserTasks.canPublish(task);
    },
    publish(task) {
      this.selectedTask = task;

      let permissions = this.$store.state.user.permissions;
      if (UseService.hasPermission(permissions, "task.no_review")) {
        UserTasks.publish(this.selectedTask.id).then(res => {
          this.fetch();
        });
      } else {
        this.isOpenCommentModal = true;
      }
    },
    getStatusLabel(task_status) {
      return UserTasks.getStatusLabel(task_status);
    },
    getColorLabel(task_status) {
      return UserTasks.getColorLabel(task_status);
    },
    makeComment(comment) {
      let data = {
        comment: comment
      };

      Reviews.create(this.selectedTask.id, data).then(res => {
        UserTasks.publish(this.selectedTask.id).then(res => {
          this.fetch();
          this.isOpenCommentModal = false;
        });
      });
    }
  },
  computed: {
    orderedTasks: function() {
      return _.orderBy(this.tasks, task => task.id, "desc");
    }
  }
};
</script>

<style scoped>
.nowrap-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.task-list .column {
  padding: 0.2rem;
}
</style>
