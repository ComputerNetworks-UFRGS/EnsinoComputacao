<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-end is-pulled-right">
        <div class="navbar-item">
          <div
            class="dropdown is-right"
            :class="{'is-active': isMenuOpen}"
            @click="isMenuOpen = !isMenuOpen"
          >
            <div class="dropdown-trigger">
              <button class="button is-light">
                <span>{{ ($store.state.user ? $store.state.user.name : 'Meus dados') }}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu">
              <div class="dropdown-content">
                <router-link class="dropdown-item" to="/">Voltar para o site</router-link>
                <hr class="dropdown-divider" />
                <a class="dropdown-item" href="#/" @click="logout">Sair</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/brand/color.png" alt="compeduba" />
        </router-link>
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

<style scoped>
.navbar {
  background: #fafafa !important;
}
</style>