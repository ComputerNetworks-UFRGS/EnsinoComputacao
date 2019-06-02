<template>
  <section class="task-page">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title cursor" @click="$router.push('/atividades')">
            <i class="fas fa-arrow-left" aria-hidden="true"></i>
            {{ task.title }}
          </h1>
          <h2 class="subtitle" v-if="task.user">Criado por: {{ task.user.name }}</h2>
        </div>
      </div>
    </section>
    <br>
    <div class="container">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ task.title }}</p>
          <a href="#!" @click="print" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-print" aria-hidden="true"></i>
            </span>
            Imprimir
          </a>
        </header>
        <div class="card-content">
          <div class="columns">
            <div class="column is-8">
              <div class="content ql-editor">
                <span v-html="task.description"></span>
              </div>
            </div>
            <div class="column">
              <div v-if="task.is_plugged">
                <b>Atividade plugada</b>
                <br>Requer uso de computadores.
              </div>
              <div v-else>
                <b>Atividade desplugada</b>
                <br>Não requer uso de computadores.
              </div>

              <div v-if="task.skills">
                <hr>
                <b>Habilidade(s) trabalhada(s)</b>
                <ul>
                  <li v-for="skill of task.skills" :key="skill.id">
                    <br>
                    <span class="tag">{{ skill.habilidade_codigo }}</span>
                    {{ skill.habilidade_nome }}
                    <b-tooltip label="Etapa de ensino recomendada" position="is-bottom">
                      <small>[{{ skill.age_group.name }}]</small>
                    </b-tooltip>
                  </li>
                </ul>
              </div>

              <div v-if="task.attachments">
                <hr>
                <b>Material de apoio</b>
                <div v-for="attachment of task.attachments" :key="attachment.id" class="attachment">
                  <div>{{ attachment.title }}</div>
                  <div v-if="attachment.description">{{ attachment.description }}</div>
                  <a :href="getPublicUrl(attachment)">Baixar arquivo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Tasks from "@/services/task";

export default {
  data() {
    return {
      task: []
    };
  },
  created() {
    Tasks.detail(this.$route.params.id)
      .then(res => res.data)
      .then(task => (this.task = task));
  },
  methods: {
    print: function() {
      window.print();
    },
    getPublicUrl(attachment) {
      return "http://localhost:8000/" + attachment.path;
    }
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
}
</style>
