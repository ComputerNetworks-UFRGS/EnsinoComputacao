<template>
  <div>
    <br>
    <h4 class="title is-4">Revisão de atividades</h4>

    <div class="card">
      <div class="card-content">
        <div class="columns task-list " v-for="task of tasks" :key="task.id">
          <div class="column is-8 nowrap-text">
            <b>{{ task.title }}</b>&nbsp;
            <br>    
            <span
              class="tag"
              :class="getColorLabel(task.status)"
            >{{ getStatusLabel(task.status) }}</span>
          </div>
          <div class="column has-text-right">
            <router-link
              v-auth="'review.detail'"
              v-if="task.status == 1"
              :to="'/dash/revisao/' + task.id"
              class="button is-small is-light is-primary"
            >Avaliar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Reviews from "@/services/review";
import UserTasks from "@/services/user-task";

export default {
  data() {
    return {
      tasks: []
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      Reviews.list()
        .then(res => res.data)
        .then(tasks => {
          this.tasks = tasks;
        });
    },
    canPublish(task) {
      return UserTasks.canPublish(task);
    },
    getStatusLabel(task_status) {
      return UserTasks.getStatusLabel(task_status);
    },
    getColorLabel(task_status) {
      return UserTasks.getColorLabel(task_status);
    }
  }
};
</script>

<style>
.task-list .column {
  padding: 0.2rem;
}
</style>
