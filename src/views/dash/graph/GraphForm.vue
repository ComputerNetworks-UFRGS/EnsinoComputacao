<template>
  <div>
    <br>
    <router-link to="/dash/papeis" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Novo currículo</h4>
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input v-model="form.title" class="input" placeholder="Nome">
          </div>
        </div>

        <div class="field">
          <label class="label">Descrição</label>
          <div class="control">
            <input v-model="form.description" class="input" placeholder="Descrição curta">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success" @click="create">Criar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";

export default {
  data() {
    return {
      form: {
        title: "",
        description: ""
      },
      errors: {
        title: [],
        description: []
      }
    };
  },
  methods: {
    create() {
      for (let k in this.errors) {
        this.errors[k] = [];
      }

      let data = {
        title: this.form.title,
        description: this.form.description
      };

      Graphs.create(data).then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/curriculos");
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

<style>
</style>
