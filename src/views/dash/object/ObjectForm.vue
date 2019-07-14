<template>
  <div>
    <br />
    <router-link to="/dash/objetos/" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4" v-if="objectId">Editar: {{ form.name }}</h4>
    <h4 class="title is-4" v-else>Novo objeto</h4>

    <button
      v-auth="'topics.delete'"
      v-if="objectId"
      @click="remove"
      class="button is-small is-light"
    >Excluir objeto</button>
    <hr />

    <div>
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input v-model="form.name" class="input" placeholder="Nome" />
        </div>
        <div class="help is-danger" v-if="errors.name.length > 0">
          <div v-for="error in errors.name" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <textarea v-model="form.description" class="input" placeholder="Descrição"></textarea>
        </div>
        <div class="help is-danger" v-if="errors.description.length > 0">
          <div v-for="error in errors.description" :key="error">{{ error }}</div>
        </div>
      </div>

      <div class="field">
        <label class="label">Eixo de ensino</label>
        <div class="control">
          <div class="select">
            <select v-model="form.learning_axis_id">
              <option :value="a.id" v-for="a of axis" :key="a.id">{{ a.name }}</option>
            </select>
          </div>
        </div>
        <div class="help is-danger" v-if="errors.learning_axis_id.length > 0">
          <div v-for="error in errors.learning_axis_id" :key="error">{{ error }}</div>
        </div>
      </div>
      <button
        v-if="objectId"
        v-auth="'topics.edit'"
        class="button is-primary is-success"
        @click="create"
      >Atualizar objeto</button>
      <button
        v-else
        v-auth="'topics.add'"
        class="button is-primary is-success"
        @click="create"
      >Criar objeto</button>
    </div>
  </div>
</template>

<script>
import Axis from "@/services/axis";
import Objects from "@/services/object";

export default {
  data() {
    return {
      objectId: false,
      form: {
        name: "",
        description: "",
        learning_axis_id: ""
      },
      errors: {
        name: [],
        description: [],
        learning_axis_id: []
      },
      axis: []
    };
  },
  created() {
    this.objectId = this.$route.params.id;

    if (this.objectId) {
      Objects.detail(this.objectId)
        .then(res => res.data)
        .then(object => {
          this.form = object;
        });
    } else {
      this.form.sequential_number = 1;
    }

    Axis.list()
      .then(res => res.data)
      .then(axis => {
        this.axis = axis;
      });
  },
  methods: {
    create() {
      for (let k in this.errors) {
        this.errors[k] = [];
      }

      let data = {
        name: this.form.name,
        description: this.form.description,
        learning_axis_id: this.form.learning_axis_id
      };

      let request = "";
      if (this.objectId) {
        request = Objects.update(this.objectId, data);
      } else {
        request = Objects.create(data);
      }

      request.then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/objetos/");
        } else {
          for (let k in res.data) {
            this.errors[k] = res.data[k];
          }
        }
      });
    },
    remove() {
      this.$dialog.confirm({
        message: "Confirma exclusão de objeto?",
        onConfirm: () => {
          Objects.delete(this.objectId)
          .finally(() => {
            this.$router.push("/dash/objetos/");
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
