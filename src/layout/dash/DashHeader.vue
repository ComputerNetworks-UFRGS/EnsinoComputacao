<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/brand/color.png" alt="compeduba">
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{'is-active': isMenuOpen}" @click="isMenuOpen = false">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{ ($store.state.user ? $store.state.user.name : 'Meus dados') }}</a>

            <div class="navbar-dropdown is-right ">
              <router-link class="navbar-item" to="/">voltar para o site</router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" href="#/" @click="logout">Sair</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AuthService from "@/services/auth";

export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$store.commit("set_user", false);
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>