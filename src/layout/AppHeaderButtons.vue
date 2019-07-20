<template>
  <div class="navbar-end" v-if="isAuth">
    <div class="navbar-item">
      <div class="buttons">
        <router-link to="/dash/atividades/" class="button is-primary">{{ $store.state.user.name }}</router-link>
      </div>
    </div>
  </div>
  <div class="navbar-end" v-else>
    <div class="navbar-item">
      <div class="buttons">
        <router-link to="/login" class="button is-light">Entrar</router-link>
        <router-link to="/cadastro" class="button is-primary is-hidden-mobile">
          <span class="nav-link-inner--text">Criar conta</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "@/services/auth";

export default {
  name: "app-header-buttons",
  data() {
    return {
      isAuth: false,
      isMenuOpen: true
    };
  },
  created() {
    this.isAuth = AuthService.loggedIn();
  }
};
</script>
