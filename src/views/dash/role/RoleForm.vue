<template>
  <div>
    <br>
    <router-link to="/dash/papeis" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Novo perfil de usuário</h4>
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Nome do perfil de acesso</label>
          <div class="control">
            <input v-model="form.title" class="input" placeholder="Nome">
          </div>
        </div>

        <div class="field">
          <label class="label">Descrição curta das permissões do perfil</label>
          <div class="control">
            <input v-model="form.description" class="input" placeholder="Descrição curta">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success" @click="create">Criar perfil</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Roles from "@/services/role";

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

      Roles.create(data).then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/papeis");
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
