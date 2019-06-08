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

              <div v-if="task.skills && task.skills.length > 0">
                <br>
                <b>Habilidade(s) trabalhada(s)</b>
                <span v-for="skill of task.skills" :key="skill.id">
                  <span
                    class="tag cursor"
                    @click="skill.showDescription = !skill.showDescription"
                  >
                    <span class="icon">
                      <i
                        class="fas"
                        :class="{
                            'fa-angle-down': skill.showDescription,
                            'fa-angle-right': !skill.showDescription,
                          }"
                      ></i>
                    </span>
                    {{ skill.habilidade_codigo }}
                  </span>
                  <div v-show="skill.showDescription">
                    <small>
                      {{ skill.habilidade_nome }}
                      <b-tooltip label="Etapa de ensino recomendada" position="is-bottom">
                        <small>[{{ skill.age_group.name }}]</small>
                      </b-tooltip>
                    </small>
                  </div>
                </span>
                <hr>
              </div>

              <div v-if="task.attachments">
                <br>
                <b>Material de apoio</b>
                <div v-for="attachment of task.attachments" :key="attachment.id" class="attachment">
                  <b style="font-size: 0.9rem">{{ attachment.title }}</b>
                  <br>
                  <small v-if="attachment.description">
                    {{ attachment.description }}
                    <br>
                  </small>
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
      .then(task => {
        if (task.skills && task.skills.length > 0) {
          for (let skill of task.skills) {
            skill.showDescription = false;
          }
        }
        this.task = task;
      });
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
  .ql-editor {
    p,
    blockquote {
      margin-bottom: 0px !important;
    }
  }
}
</style>
