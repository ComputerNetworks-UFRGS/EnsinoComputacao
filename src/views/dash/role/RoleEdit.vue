<template>
  <div>
    <br>
    <router-link to="/dash/papeis" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Gerenciar permissões: {{ role.title }}</h4>
    <div class="card">
      <div class="card-content">
        <div class="columns is-multiline">
          <div v-for="category of categories" :key="category.id" class="column is-4">
            <b>{{ category.title }}</b>
            <ul>
              <li v-for="permission of category.permissions" :key="permission.id">
                <label>
                  <b-checkbox
                    v-model="permission.checked"
                    :checked="permission.checked"
                  >{{ permission.description }}</b-checkbox>
                  <!-- <input type="checkbox" v-model="permission.checked" :checked="permission.checked"> -->
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button v-auth="'role.edit'" class="button is-success" @click="teste">Atualizar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Roles from "@/services/role";
import Permissions from "@/services/permission";
import _ from "lodash";

export default {
  data() {
    return {
      role: {},
      categories: {}
    };
  },
  created() {
    Roles.detail(this.$route.params.id)
      .then(res => res.data)
      .then(role => {
        this.role = role;
        return Permissions.list().then(res => res.data);
      })
      .then(permissions => {
        this.categories = {};

        for (let permission of permissions) {
          let inRole =
            _.find(this.role.permissions, p => {
              return p.id == permission.id;
            }) !== undefined;

          this.$set(permission, "checked", inRole);

          let cat_id = permission.category_id;
          if (this.categories[cat_id] == undefined) {
            this.categories[cat_id] = {
              id: cat_id,
              title: permission.category.title,
              permissions: []
            };
          }
          this.categories[cat_id].permissions.push(permission);
        }
      });
  },
  methods: {
    teste() {
      let permissions = _.map(this.categories, c => {
        return c.permissions;
      });
      let permissions_checked = _.filter(
        _.flatten(permissions),
        p => p.checked
      );
      let ids = _.map(permissions_checked, p => p.id);

      Roles.update(this.role.id, ids).then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/papeis");
        }
      });
    }
  }
};
</script>

<style>
</style>
