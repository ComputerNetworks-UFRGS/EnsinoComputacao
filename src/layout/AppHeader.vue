<template>
  <nav class="navbar is-fresh is-transparent no-shadow">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/fresh/images/logos/logo.png" alt="CompEduBa!" height="45" />
        </router-link>
      </div>

      <div v-if="isAuth" id="navbar-menu" class="navbar-menu is-static">
        <div class="navbar-end">
          <router-link to="/dash/atividades/" class="navbar-item">
            <span
              class="button signup-button rounded secondary-btn raised"
            >{{ $store.state.user.name }}</span>
          </router-link>
        </div>
      </div>
      <div v-else id="navbar-menu" class="navbar-menu is-static">
        <div class="navbar-end">
          <router-link to="/entrar" class="navbar-item is-secondary">Entrar</router-link>
          <router-link to="/criar-conta" class="navbar-item">
            <span class="button signup-button rounded secondary-btn raised">Criar conta</span>
          </router-link>
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
      isAuth: false,
      isMenuOpen: true
    };
  },
  created() {
    this.isAuth = AuthService.loggedIn();
  }
};
</script>

<style scoped lang="scss">
.navbar {
  background: transparent;
  a {
    background: transparent;
  }
}
</style>
