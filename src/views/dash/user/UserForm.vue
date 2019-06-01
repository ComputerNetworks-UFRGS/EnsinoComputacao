<template>
  <div>
    <h3>Editar perfil de usuário</h3>

    <router-link to="/dash/usuarios" class="btn btn-secondary">Cancelar</router-link>

    <br>
    <br>
    <div class="row">
      <div class="col col-lg-8">
        <div class="box">
          <form role="form">
            <select name="role_id" v-model="form.role_id">
              <option value="null">Comum</option>
              <option v-for="role of roles" :key="role.id" :value="role.id">{{ role.title }}</option>
            </select>
            <div class>
              <button type="primary" class="my-4" @click="create">Atualizar</button>
            </div>
          </form>
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
