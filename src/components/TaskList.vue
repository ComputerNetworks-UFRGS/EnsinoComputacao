<template>
  <div class="py-3">
    <span v-if="tasks.length > 0">
      <div class="border-1 mb-4" v-for="task of tasks" :key="task.id">
        <h4 class="text-primary text-uppercase">
          <b>{{ task.title }}</b>
        </h4>
        <router-link :to="'/atividade/'+task.id">
          <button tag="a" href="#" type="primary" class="btn btn-sm btn-link mt-2">Ver atividade</button>
        </router-link>
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
