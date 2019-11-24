<template>
  <div class="card">
    <br />
    <router-link to="/dash/atividades/" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4" v-if="taskId">Editar: {{ form.title }}</h4>
    <h4 class="title is-4" v-else>Nova atividade</h4>
    <button
      v-if="taskId"
      v-auth="'task.delete'"
      @click="remove(form)"
      class="button is-small is-light"
    >Excluir esta atividade</button>
    <hr />
    <div>
      <div class="field">
        <label class="label">Tipo de atividade</label>
        <div class="control">
          <div v-if="taskId">{{ form.type | labelTaskType }}</div>
          <div v-else>
            <div class="select">
              <select v-model="form.type">
                <option v-for="(type, id) of taskTypes" :key="id" :value="id">{{ type }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="help is-danger" v-if="errors.type.length > 0">
          <div v-for="error in errors.type" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input v-model="form.title" class="input" placeholder="Título" />
        </div>
        <div class="help is-danger" v-if="errors.title.length > 0">
          <div v-for="error in errors.title" :key="error">{{ error }}</div>
        </div>
      </div>

      <!-- Tipo criar -->
      <div class="field" v-if="form.type == 1">
        <label class="label">Descrição da atividade</label>
        <div class="control">
          <vue-editor v-model="form.description" placeholder="Descrição da atividade"></vue-editor>
        </div>
        <div class="help is-danger" v-if="errors.description.length > 0">
          <div v-for="error in errors.description" :key="error">{{ error }}</div>
        </div>
      </div>

      <!-- Tipo referência externa -->
      <div class="field" v-if="form.type == 2">
        <label class="label">Fonte</label>
        <div class="control">
          <input v-model="form.source" class="input" placeholder="Quem criou essa atividade?" />
        </div>
        <div class="help is-danger" v-if="errors.source.length > 0">
          <div v-for="error in errors.source" :key="error">{{ error }}</div>
        </div>
      </div>
      <div class="field" v-if="form.type == 2">
        <label class="label">Link</label>
        <div class="control">
          <input v-model="form.link" class="input" placeholder="Link para a atividade" />
        </div>
        <div class="help is-danger" v-if="errors.link.length > 0">
          <div v-for="error in errors.link" :key="error">{{ error }}</div>
        </div>
      </div>

      <br />

      <div class="box">
        <div class="field">
          <label class="label">Essa atividade requer o uso de computadores?</label>
          <div class="control">
            <b-radio v-model="form.is_plugged" native-value="1">Sim</b-radio>
            <b-radio v-model="form.is_plugged" native-value="0">Não</b-radio>
          </div>
          <div class="help is-danger" v-if="errors.is_plugged.length > 0">
            <div v-for="error in errors.is_plugged" :key="error">{{ error }}</div>
          </div>
        </div>

        <b>Habilidade(s) trabalhada(s)</b>
        <br />
        <small v-if="!form.skills || form.skills.length <= 0">
          Selecione quais habilidades são exercitadas com essa atividade.
          <br />
        </small>

        <span v-if="form.skills && form.skills.length > 0">
          <br />
          <div v-for="(skill, index) of form.skills" :key="skill.id">
            <span class="tag is-rounded is-info">{{ skill.habilidade_codigo }}</span>
            <button class="button is-small is-light" @click="removeSkill(index)">remover</button>
            <small>
              <br />
              {{ skill.habilidade_nome }}
              <br />
              <b>Etapa recomendada:</b>
              {{ skill.age_group.name }}
            </small>
            <br />
            <br />
          </div>
        </span>

        <button class="button is-white is-small" @click="openSkillSelector = true">
          <span v-if="form.skill">Alterar habilidade</span>
          <span v-else>Selecionar habilidades</span>
        </button>

        <br />
        <br />
        <div class="field">
          <label class="label">TAGs relacionadas</label>
          <div class="control">
            <b-taginput
              v-model="form.tags"
              :data="filteredTags"
              autocomplete
              :allow-new="true"
              :open-on-focus="false"
              field="value"
              placeholder="Adicionar tag"
              @typing="getFilteredTags"
            ></b-taginput>
          </div>
          <div class="help is-danger" v-if="errors.tags.length > 0">
            <div v-for="error in errors.tags" :key="error">{{ error }}</div>
          </div>
        </div>
      </div>

      <br />
      <div v-auth="'task.edit'" v-if="form.status != 2">
        <button
          v-if="taskId"
          class="button is-primary is-success"
          @click="create"
        >Atualizar atividade</button>
        <button v-else class="button is-primary is-success" @click="create">Criar atividade</button>
      </div>
      <button v-else class="button is-primary is-success" disabled>Publicação negada</button>
    </div>

    <review-list :reviews="form.reviews"></review-list>

    <b-modal :active="openSkillSelector !== false" @close="openSkillSelector = false">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Selecione as habilidades trabalhadas com essa atividade</p>
        </header>
        <div class="card-content">
          <div class="content">
            <skill-list :years="years" @click="setSkill"></skill-list>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#!" class="card-footer-item" @click="openSkillSelector = false">Fechar</a>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import UserTasks from "@/services/user-task";
import Skills from "@/services/skill";
import Tasks from "@/services/task";
import Tags from "@/services/tag";
import SkillList from "@/components/SkillList";
import { VueEditor } from "vue2-editor";
import _ from "lodash";
import ReviewList from "@/components/ReviewList";

export default {
  components: {
    SkillList,
    VueEditor,
    ReviewList
  },
  data() {
    return {
      taskId: false,
      years: {},
      openSkillSelector: false,
      form: {
        title: "",
        description: "",
        is_plugged: false,
        skills: [],
        tags: [],
        type: 1,
        source: '',
        link: ''
      },
      errors: {
        title: [],
        description: [],
        is_plugged: [],
        skills: [],
        tags: [],
        type: [],
        source: [],
        link: []
      },
      filteredTags: [],
      tags: [],
      taskTypes: []
    };
  },
  created() {
    this.taskId = this.$route.params.id;
    if (this.taskId) {
      UserTasks.detail(this.$route.params.id)
        .then(res => res.data)
        .then(task => {
          this.form = task;
        });
    }
    Skills.years()
      .then(res => res.data)
      .then(years => (this.years = years));

    Tags.list()
      .then(res => res.data)
      .then(tags => {
        this.tags = tags;
      });

    Tasks.getTypes()
      .then(res => res.data)
      .then(tasks => {
        this.taskTypes = tasks;
      });
  },
  filters: {
    labelTaskType(val) {
      let labels = {
        "1": "atividade criada",
        "2": "referência externa"
      };
      return labels[val] || val;
    }
  },
  methods: {
    create() {
      for (let k in this.errors) {
        this.errors[k] = [];
      }

      let data = {
        title: this.form.title,
        description: this.form.description,
        is_plugged: this.form.is_plugged,
        skills: _.map(this.form.skills, s => s.habilidade_id),
        tags: _.map(this.form.tags, t => {
          if (t.id) {
            return t.id;
          }
          return t;
        }),
        type: this.form.type,
        source: this.form.source,
        link: this.form.link
      };

      let request = "";
      if (this.taskId) {
        request = UserTasks.update(this.form.id, data);
      } else {
        request = UserTasks.create(data);
      }

      request.then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/atividades/");
        } else {
          for (let k in res.data) {
            this.errors[k] = res.data[k];
          }
        }
      });
    },
    setSkill(skill) {
      skill.age_group = {};
      skill.age_group.name = skill.idade_nome;
      this.form.skills.push(skill);
      this.openSkillSelector = false;
    },
    removeSkill(index) {
      this.form.skills.splice(index, 1);
    },
    remove(task) {
      this.$dialog.confirm({
        message: "Confirma exclusão de atividade?",
        onConfirm: () => {
          UserTasks.remove(task.id).finally(() => {
            this.$router.push("/dash/atividades/");
          });
        }
      });
    },
    getFilteredTags(text) {
      this.filteredTags = this.tags.filter(option => {
        return (
          option.value
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  }
};
</script>

<style scoped>
.box {
  background: #eeeeee;
  padding: 30px;
  border-radius: 8px;
}
.cursor {
  cursor: pointer;
}
.card {
  padding: 24px;
}
</style>
