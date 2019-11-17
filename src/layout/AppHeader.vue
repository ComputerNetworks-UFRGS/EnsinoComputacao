<template>
  <nav class="navbar is-fresh is-transparent no-shadow">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/fresh/images/logos/fresh-alt.svg" alt width="112" height="28" />
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
          <router-link to="/login" class="navbar-item is-secondary">Entrar</router-link>
          <router-link to="/cadastro" class="navbar-item">
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
}
// @import "@/assets/custom.scss";
// .navbar .navbar-start .is-active {
//   background: $primary !important;
//   color: white !important;
// }
// @media (max-width: 1023px) {
//   .navbar-menu {
//     padding: 0px;
//     box-shadow: unset;
//     .navbar-start {
//       background: #fafafa;
//       display: flex;
//       justify-content: center;
//       .navbar-item {
//         flex-shrink: unset;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         text-align: center;
//         line-height: 1rem;
//         font-size: 0.9rem;
//         padding: 12px 8px;
//         width: 100%;
//       }
//     }
//   }
// }
</style>
