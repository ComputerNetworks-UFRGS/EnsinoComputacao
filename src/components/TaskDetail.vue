<template>
  <div class="task-detail card">
    <header class="card-header">
      <p class="card-header-title">{{ task.title }}</p>
      <a
        v-if="showPrint"
        href.prevent="#!"
        @click="print"
        class="card-header-icon"
        aria-label="more options"
      >
        <span class="icon">
          <font-awesome-icon icon="print" />
        </span>
        Imprimir
      </a>
    </header>
    <div class="card-content">
      <div class="columns">
        <div class="column is-8">
          <div v-if="task.type == 1" class="content ql-editor">
            <span v-html="task.description"></span>
          </div>
          <div v-else-if="task.type == 2">
            <b>Fonte</b>
            : {{ task.source }}
            <br />
            <b>Link</b>:
            <a target="_blank" :href="task.link">{{ task.link }}</a>
            <br />
          </div>
        </div>
        <div class="column is-4 right-menu">
          <div v-if="task.is_plugged">
            <b>Atividade plugada</b>
            <br />Requer uso de computadores.
          </div>
          <div v-else>
            <b>Atividade desplugada</b>
            <br />Não requer uso de computadores.
          </div>

          <div v-if="task.skills && task.skills.length > 0">
            <br />
            <div>
              <b>Habilidade(s) trabalhada(s)</b>
            </div>

            <span v-for="skill of task.skills" :key="skill.id">
              <span class="tag cursor" @click="skill.showDescription = !skill.showDescription">
                <span class="icon">
                  <font-awesome-icon v-if="skill.showDescription" icon="angle-down" />
                  <font-awesome-icon v-if="!skill.showDescription" icon="angle-right" />
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
            <hr />
          </div>

          <div v-if="task.attachments">
            <br />
            <b>Material de apoio</b>
            <div v-for="attachment of task.attachments" :key="attachment.id" class="attachment">
              <b style="font-size: 0.9rem">{{ attachment.title }}</b>
              <br />
              <small v-if="attachment.description">
                {{ attachment.description }}
                <br />
              </small>
              <a :href="getPublicUrl(attachment)">Baixar arquivo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tasks from "@/services/task";

export default {
  name: "task-detail",
  props: {
    taskId: {
      type: Number
    },
    showPrint: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      task: []
    };
  },
  created() {
    Tasks.detail(this.taskId)
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
      return process.env.VUE_APP_FILE_URL + attachment.path;
    }
  }
};
</script>
<style lang="scss">
.task-detail {
  .tag {
    margin: 6px 8px 0px 0px;
  }
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
  .card-content {
    // margin-top: 0px;
    padding-right: 0.75rem;
    padding-top: 0.75rem;
    .right-menu {
      background: #fafafa;
    }
    .columns {
      width: 100%;
    }
  }
}
</style>
