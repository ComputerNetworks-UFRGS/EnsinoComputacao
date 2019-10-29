<template>
  <div>
    <div v-if="node">
      <h5 class="title is-5">{{ node.learnig_object.name }}</h5>
      <div>
        <b>Habilidades trabalhadas</b>
        <ul>
          <li
            class="list"
            v-for="skill of node.learnig_object.skills"
            :key="skill.id"
          >{{ skill.name }}</li>
        </ul>
      </div>
      <div>
        <b>Pré-requisitos</b>
        <ul>
          <li
            class="list"
            v-for="dependency of node.dependencies"
            :key="dependency.id"
          >{{ dependency.title }}</li>
        </ul>
      </div>
      <div>
        <b>Libera</b>
        <ul>
          <li
            class="list"
            v-for="dependent of node.dependents"
            :key="dependent.id"
          >{{ dependent.title }}</li>
        </ul>
      </div>
      <hr />
      <b>Atividades</b>
      <task-list :tasks="tasks"></task-list>
    </div>
  </div>
</template>
<script>
import Tasks from "@/services/task";
import TaskList from "@/components/TaskList";

export default {
  name: "graph-node-detail",
  props: {
    node: {
      default: undefined
    }
  },
  components: {
    TaskList
  },
  data() {
    return {
      tasks: []
    };
  },
  watch: {
    node(val) {
      Tasks.list({
        objects: [val.learnig_object.id]
      })
        .then(res => res.data)
        .then(tasks => {
          this.tasks = tasks;
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>