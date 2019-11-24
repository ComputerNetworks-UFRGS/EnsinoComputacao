<template>
  <div class="navbar-end">
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
              <font-awesome-icon icon="angle-down" />
            </span>
          </button>
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a class="dropdown-item" href="#/" @click="logout">Sair</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth";

export default {
  name: "dash-header-buttons",
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