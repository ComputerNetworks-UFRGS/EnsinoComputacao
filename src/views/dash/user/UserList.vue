<template>
  <div>
    <br />
    <h4 class="title is-4">Usuários</h4>
    <div class="card">
      <div class="card-content">
        <div v-if="isLoading">
          <br />
          <br />
        </div>
        <div v-else>
          <div class="columns" v-for="user of users" :key="user.id">
            <div class="column is-12">
              <router-link
                v-auth="'users.edit'"
                :to="'usuarios/' + user.id + '/' + user.role_id"
                class="button is-light is-small"
              >Editar</router-link>&nbsp;
              <b>{{ user.name }}</b>
              <small>({{ user.email }})</small>

              <span v-if="user.role">
                &nbsp;
                <span class="tag is-info">{{ user.role.title }}</span>
              </span>
              <!-- <span v-else>
              <span class="tag is-light"></span>
              </span>-->
            </div>
          </div>
        </div>
        <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      </div>
    </div>
  </div>
</template>

<script>
import Users from "@/services/user";

export default {
  data() {
    return {
      isLoading: false,
      users: []
    };
  },
  created() {
    this.isLoading = true;
    Users.list()
      .then(res => res.data)
      .then(users => {
        this.users = users;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>

<style>
</style>
