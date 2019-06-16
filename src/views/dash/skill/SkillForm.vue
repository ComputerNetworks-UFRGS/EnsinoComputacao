<template>
  <div>
    <br>
    <router-link to="/dash/habilidades/" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4" v-if="skillId">Editar: {{ form.name }}</h4>
    <h4 class="title is-4" v-else>Nova habilidade</h4>

    <!-- <button
      v-if="skillId"
      @click="remove(form)"
      class="button is-small is-light"
    >Excluir esta habilidade</button>-->
    <hr>

    <div>
      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input v-model="form.name" class="input" placeholder="Título">
        </div>
        <div class="help is-danger" v-if="errors.name.length > 0">
          <div v-for="error in errors.name" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Código</label>
        <div class="control">
          <input v-model="form.code" class="input" placeholder="Código">
        </div>
        <div class="help is-danger" v-if="errors.code.length > 0">
          <div v-for="error in errors.code" :key="error">{{ error }}</div>
        </div>
      </div>

      <!-- <div class="field">
        <label class="label">sequential_number</label>
        <div class="control">
          <input v-model="form.sequential_number" class="input" placeholder="Título">
        </div>
        <div class="help is-danger" v-if="errors.sequential_number.length > 0">
          <div v-for="error in errors.sequential_number" :key="error">{{ error }}</div>
        </div>
      </div> -->

      <div class="field">
        <label class="label">Etapa de aprendizado</label>
        <div class="control">
          <div class="select">
            <select v-model="form.learning_stage_id">
              <option
                :value="learning_stage.id"
                v-for="learning_stage of learning_stages"
                :key="learning_stage.id"
              >{{ learning_stage.name }}</option>
            </select>
          </div>
        </div>
        <div class="help is-danger" v-if="errors.learning_stage_id.length > 0">
          <div v-for="error in errors.learning_stage_id" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Idade recomendada</label>
        <div class="control">
          <div class="select">
            <select v-model="form.age_group_id">
              <option
                :value="age_group.id"
                v-for="age_group of age_groups"
                :key="age_group.id"
              >{{ age_group.name }}</option>
            </select>
          </div>
        </div>
        <div class="help is-danger" v-if="errors.age_group_id.length > 0">
          <div v-for="error in errors.age_group_id" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Objeto de aprendizagem</label>
        <div class="control">
          <div class="select">
            <select v-model="form.topic_id">
              <option :value="topic.id" v-for="topic of topics" :key="topic.id">{{ topic.name }}</option>
            </select>
          </div>
        </div>
        <div class="help is-danger" v-if="errors.topic_id.length > 0">
          <div v-for="error in errors.topic_id" :key="error">{{ error }}</div>
        </div>
      </div>

      <button class="button is-primary is-success" @click="create">
        <span v-if="skillId">Atualizar habilidade</span>
        <span v-else>Criar habilidade</span>
      </button>
    </div>
  </div>
</template>

<script>
import Skills from "@/services/skill";
import Topics from "@/services/topic";
import AgeGroups from "@/services/age-group";
import LearningStages from "@/services/learning-stage";

export default {
  data() {
    return {
      skillId: false,
      form: {
        code: "",
        name: "",
        sequential_number: "",
        learning_stage_id: "",
        age_group_id: "",
        topic_id: ""
      },
      errors: {
        code: [],
        name: [],
        sequential_number: [],
        learning_stage_id: [],
        age_group_id: [],
        topic_id: []
      },
      topics: [],
      age_groups: [],
      learning_stages: []
    };
  },
  created() {
    this.skillId = this.$route.params.id;

    if (this.skillId) {
      Skills.detail(this.skillId)
        .then(res => res.data)
        .then(skill => {
          this.form = skill;
        });
    } else {
        this.form.sequential_number = 1
    }

    Topics.list()
      .then(res => res.data)
      .then(topics => {
        this.topics = topics;
      });

    AgeGroups.list()
      .then(res => res.data)
      .then(age_groups => {
        this.age_groups = age_groups;
      });
    LearningStages.list()
      .then(res => res.data)
      .then(learning_stages => {
        this.learning_stages = learning_stages;
      });
  },
  methods: {
    create() {
      
        for (let k in this.errors) {
          this.errors[k] = [];
        }

        let data = {
          code: this.form.code,
          name: this.form.name,
          sequential_number: this.form.sequential_number,
          learning_stage_id: this.form.learning_stage_id,
          age_group_id: this.form.age_group_id,
          topic_id: this.form.topic_id,
        };

        let request = "";
        if (this.skillId) {
          request = Skills.update(this.skillId, data);
        } else {
          request = Skills.create(data);
        }

        request.then(res => {
          if (res.status == 200) {
            this.$router.push("/dash/habilidades/");
          } else {
            for (let k in res.data) {
              this.errors[k] = res.data[k];
            }
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
