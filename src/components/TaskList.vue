<template>
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
              <router-link :to="'/atividades/'+task.id" class="card-footer-item">Detalhes</router-link>
            </footer>
          </div>
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

<style lang="scss">
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
</style>
