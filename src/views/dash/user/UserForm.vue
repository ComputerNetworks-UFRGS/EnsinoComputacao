<template>
  <div>
    <br>
    <router-link to="/dash/usuarios" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Editar perfil de usuário</h4>

    <div class="card">
      <div class="card-content">
        <div class="field">
          <div class="label">Perfil de acesso</div>
          <div class="control">
            <div class="select">
              <select name="role_id" v-model="form.role_id">
                <option value="null">Cadastrado</option>
                <option v-for="role of roles" :key="role.id" :value="role.id">{{ role.title }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success" @click="create">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Users from "@/services/user";
import Roles from "@/services/role";

export default {
  data() {
    return {
      roles: [],
      form: {
        role_id: ""
      },
      errors: {
        role_id: []
      }
    };
  },
  created() {
    this.form.role_id = this.$route.params.role_id;
    Roles.list()
      .then(res => res.data)
      .then(roles => {
        this.roles = roles;
      });
  },
  methods: {
    create() {
      for (let k in this.errors) {
        this.errors[k] = [];
      }

      let data = {
        role_id: this.form.role_id == "null" ? null : this.form.role_id
      };

      Users.update(this.$route.params.id, data).then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/usuarios");
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
