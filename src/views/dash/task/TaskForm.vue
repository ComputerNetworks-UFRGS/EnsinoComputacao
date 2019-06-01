<template>
  <div>
    <br>
    <h3 v-if="taskId">Editar: {{ form.title }}</h3>
    <h3 v-else>Nova atividade</h3>

    <router-link to="/dash" class="btn btn-secondary">Cancelar</router-link>
    <div class="pull-right">
      <button
        v-auth="'task.delete'"
        @click="remove(form)"
        class="btn btn-sm btn-danger"
      >Excluir atividade</button>
    </div>
    <br>
    <br>
    <div class="row">
      <div class="col col-lg-8">
        <div class="box">
          <form role="form">
            <input v-model="form.title" alternative class="mb-3" placeholder="Título">

            <b-notification
              @close="errors.title = []"
              :visible="errors.title.length > 0"
            >
              <span class="alert-inner--text">
                <div v-for="error in errors.title" :key="error">{{ error }}</div>
              </span>

              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </b-notification>

            <vue-editor v-model="form.description" placeholder="Descrição da atividade"></vue-editor>

            <b-notification
              @close="errors.description = []"
              :visible="errors.description.length > 0"
            >
              <span class="alert-inner--text">
                <div v-for="error in errors.description" :key="error">{{ error }}</div>
              </span>

              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </b-notification>
            <br>
            <div v-auth="'task.edit'" v-if="form.status != 2">
              <button v-if="taskId" type="primary" class="my-4" @click="create">Atualizar atividade</button>
              <button v-else type="primary" class="my-4" @click="create">Criar atividade</button>
            </div>
            <button v-else disabled>Publicação negada</button>
          </form>
        </div>
      </div>
      <div class="col col-lg-4">
        <div class="box">
          <label for>
            <input type="checkbox" class="mb-3" v-model="form.is_plugged">
            Requer uso de computador
          </label>

          <hr>
          <b>Habilidade(s) trabalhada(s)</b>
          <br>

          <span v-if="form.skills && form.skills.length > 0">
            <div v-for="(skill, index) of form.skills" :key="skill.id">
              <div class="box2">
                <div class="pull-right cursor" @click="removeSkill(index)">remover</div>
                <!-- <div class="box2">
                                    <div class="pull-left">&darr;</div>
                                    {{ form.skill.eixo_nome }}
                                </div>                       
                                <div class="box2">
                                    <div class="pull-left">&darr;</div>
                                    {{ form.skill.objeto_nome }}
                </div>-->
                <badge type="primary">{{ skill.habilidade_codigo }}</badge>
                <small>
                  <br>
                  <!-- <div class="pull-left">&rarr;</div> -->
                  {{ skill.habilidade_nome }}
                  <br>
                  <b>Etapa recomendada:</b>
                  {{ skill.age_group.name }}
                </small>
              </div>
            </div>
          </span>
          <span v-else>Nenhuma habilidade selecionada</span>
          <button class="btn btn-success" @click="openSkillSelector = true">
            <span v-if="form.skill">Alterar habilidade</span>
            <span v-else>Selecionar habilidade</span>
          </button>
        </div>
      </div>
    </div>

    <review-list :reviews="form.reviews"></review-list>

    <modal
      :show="openSkillSelector !== false"
      @close="openSkillSelector = false"
      :modalClasses="'modal-lg'"
    >
      <h6
        slot="header"
        class="modal-title"
      >Selecione a habilidade trabalhada trabalhada nesta atividade</h6>

      <skill-list :years="years" @click="setSkill"></skill-list>

      <template slot="footer">
        <button type="link" class="ml-auto" @click="openSkillSelector = false">Fechar</button>
      </template>
    </modal>
  </div>
</template>

<script>
import UserTasks from "@/services/user-task";
import Skills from "@/services/skill";
import Modal from "@/components/Modal";
import SkillList from "@/components/SkillList";
import { VueEditor } from "vue2-editor";
import _ from "lodash";
import ReviewList from "@/components/ReviewList";

export default {
  components: {
    Modal,
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
          task.is_plugged = task.is_plugged == 1;
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
          this.$router.push("/dash");
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
      UserTasks.remove(task.id).finally(() => {
        this.$router.push("/dash");
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
.box2 {
  padding: 6px;
  color: #666666;
  border: 1px solid #cccccc;
  margin: 3px 0px;
  font-size: 12px;
  line-height: 14px;
}
.box2 .pull-left {
  width: 14px;
}
.cursor {
  cursor: pointer;
}
</style>
