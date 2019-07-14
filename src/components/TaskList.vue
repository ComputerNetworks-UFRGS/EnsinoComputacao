<template>
  <div class="columns">
    <div class="column" v-if="tasks.length > 0">
      <div class="columns" v-for="task of tasks" :key="task.id">
        <div class="column is-9">
          <b>{{ task.title }}</b>
        </div>
        <div class="column is-3 has-text-right">
          <router-link :to="'/atividades/'+task.id" class="button is-small is-light">Ver atividade</router-link>
        </div>
      </div>
    </div>
    <div class="column" v-else>Nenhuma atividade encontrada com este filtro.</div>
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
