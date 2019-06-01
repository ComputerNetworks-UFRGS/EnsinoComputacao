<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/brand/color.png" alt="EduSBC">
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/atividades" class="navbar-item">Atividades</router-link>
          <router-link to="/habilidades" class="navbar-item">Habilidades</router-link>
          <router-link to="/classificacao" class="navbar-item">Classificação</router-link>
          <router-link to="/grafo" class="navbar-item">Grafos</router-link>
        </div>

        <div class="navbar-end" v-if="isAuth">
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/dash" class="button is-primary">{{ $store.state.user.name }}</router-link>
            </div>
          </div>
        </div>
        <div class="navbar-end" v-else>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-light">Entrar</router-link>
              <router-link to="/cadastro" class="button is-primary">
                <span class="nav-link-inner--text">Criar conta</span>
              </router-link>
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
      isAuth: false
    };
  },
  created() {
    this.isAuth = AuthService.loggedIn();
  }
};
</script>
<style>
</style>
