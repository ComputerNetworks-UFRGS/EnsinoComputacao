<template>
  <div>
    <br>
    <router-link to="/dash/atividades/" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4" v-if="taskId">Editar: {{ form.title }}</h4>
    <h4 class="title is-4" v-else>Nova atividade</h4>

    <button
      v-if="taskId"
      v-auth="'task.delete'"
      @click="remove(form)"
      class="button is-small is-light"
    >Excluir esta atividade</button>
    <hr>
    <div>
      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input v-model="form.title" class="input" placeholder="Título">
        </div>
        <div class="help is-danger" v-if="errors.title.length > 0">
          <div v-for="error in errors.title" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição da atividade</label>
        <div class="control">
          <vue-editor v-model="form.description" placeholder="Descrição da atividade"></vue-editor>
        </div>
        <div class="help is-danger" v-if="errors.description.length > 0">
          <div v-for="error in errors.description" :key="error">{{ error }}</div>
        </div>
      </div>
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
        <br>
        <small v-if="!form.skills || form.skills.length <= 0">
          Selecione quais habilidades são exercitadas com essa atividade.
          <br>
        </small>

        <span v-if="form.skills && form.skills.length > 0">
          <br>
          <div v-for="(skill, index) of form.skills" :key="skill.id">
            <span class="tag is-rounded is-info">{{ skill.habilidade_codigo }}</span>
            <button class="button is-small is-light" @click="removeSkill(index)">remover</button>
            <small>
              <br>
              {{ skill.habilidade_nome }}
              <br>
              <b>Etapa recomendada:</b>
              {{ skill.age_group.name }}
            </small>
            <br>
            <br>
          </div>
        </span>

        <button class="button is-white is-small" @click="openSkillSelector = true">
          <span v-if="form.skill">Alterar habilidade</span>
          <span v-else>Selecionar habilidades</span>
        </button>
      </div>

      <br>
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
        skills: []
      },
      errors: {
        title: [],
        description: [],
        is_plugged: [],
        skills: []
      }
    };
  },
  created() {
    this.taskId = this.$route.params.id;
    if (this.taskId) {
      UserTasks.detail(this.$route.params.id)
        .then(res => res.data)
        .then(task => {
          task.is_plugged = task.is_plugged;
          this.form = task;
        });
    }
    Skills.years()
      .then(res => res.data)
      .then(years => (this.years = years));
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
        skills: _.map(this.form.skills, s => s.habilidade_id)
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
</style>
