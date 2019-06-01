<template>
  <nav type="default" effect="dark" expand>
    <router-link class="navbar-brand" to="/">EduSBC</router-link>

    <ul class="navbar-nav ml-lg-auto is-hidden-touch">
      <div tag="li" :title="($store.state.user ? $store.state.user.name : 'Seu nome')">
        <router-link class="dropdown-item" to="/">voltar para o site</router-link>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#/" @click="logout">Sair</a>
      </div>
    </ul>
  </nav>
</template>

<script>
import AuthService from "@/services/auth";

export default {
  methods: {
    logout() {
      AuthService.logout();
      this.$store.commit("set_user", false);
      this.$route.push("/");
    }
  }
};
</script>

<style>
</style>
