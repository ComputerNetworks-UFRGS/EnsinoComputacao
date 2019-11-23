<template>
  <section class="task-page">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title cursor" @click="$router.push('/atividades')">
            <font-awesome-icon icon="arrow-left" />
            {{ task.title }}
          </h1>
          <!-- <h2 class="subtitle" v-if="task.user">Criado por: {{ task.user.name }}</h2> -->
        </div>
      </div>
    </section>
    <br />
    <div class="container">
      <task-detail :task-id="parseInt($route.params.id)" :show-print="showPrint"></task-detail>
    </div>
    <br />
    <br />
  </section>
</template>
<script>
import TaskDetail from "@/components/TaskDetail";
import Tasks from "@/services/task";

export default {
  components: {
    TaskDetail
  },
  props: {
    showPrint: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      task: {}
    };
  },
  created() {
    Tasks.detail(this.$route.params.id)
      .then(res => res.data)
      .then(task => {
        this.task = task;
      });
  }
};
</script>

<style lang="scss">
.task-page {
  .task {
    img {
      width: 100%;
      max-width: 100%;
    }
  }
  .cursor {
    cursor: pointer;
  }
  .attachment {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid #dddddd;
  }
  .ql-editor {
    p,
    blockquote {
      margin-bottom: 0px !important;
    }
  }
}
</style>

