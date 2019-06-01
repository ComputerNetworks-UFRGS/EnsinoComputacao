<template>
  <div>
    <span v-if="tasks.length > 0">
      <div v-for="task of tasks" :key="task.id">
        <b>{{ task.title }}</b>
        <router-link :to="'/atividade/'+task.id" class="button is-small">Ver atividade</router-link>
      </div>
    </span>
    <span v-else>Nenhuma atividade encontrada com este filtro.</span>
  </div>
</template>

<script>
export default {
  name: "task-list",
  props: {
    tasks: Array
  }
};
</script>

<style>
</style>
