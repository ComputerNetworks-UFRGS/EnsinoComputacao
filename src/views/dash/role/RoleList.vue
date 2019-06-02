<template>
  <div>
    <br>
    <router-link
      v-auth="'role.create'"
      to="/dash/papeis/criar"
      class="button is-success is-pulled-right"
    >Novo perfil de usuário</router-link>
    <h4 class="title is-4">Perfis de acesso</h4>
    <div class="card">
      <div class="card-content">
        <ul>
          <li v-for="role of roles" :key="role.id">
            <b>{{ role.title }}</b>
            <br>
            <p>{{ role.description }}</p>

            <div class="field has-addons">
              <div class="control">
                <router-link
                  v-auth="'role.detail'"
                  :to="'/dash/papeis/' + role.id"
                  class="button is-small is-primary"
                >Gerenciar permissões</router-link>
              </div>
              <div class="control">
                <button
                  v-auth="'role.delete'"
                  @click="removeRole(role.id)"
                  class="button is-small is-light"
                >Remover</button>
              </div>
            </div>
            <br>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Roles from "@/services/role";

export default {
  data() {
    return {
      roles: []
    };
  },
  created() {
    this.fetchRoles();
  },
  methods: {
    removeRole(role_id) {
      Roles.remove(role_id).then(res => {
        this.fetchRoles();
      });
    },
    fetchRoles() {
      Roles.list()
        .then(res => res.data)
        .then(roles => {
          this.roles = roles;
        });
    }
  }
};
</script>

<style scoped>
</style>
