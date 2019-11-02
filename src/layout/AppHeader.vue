<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <app-header-buttons class="is-hidden-desktop is-pulled-right"></app-header-buttons>
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/brand/color.png" alt="compeduba" />
        </router-link>
      </div>

      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <router-link to="/atividades" class="navbar-item">
            Atividades de ensino
          </router-link>
          <router-link to="/classificacao" class="navbar-item">
            Sobre diretrizes da SBC
          </router-link>
        </div>
        <app-header-buttons class="is-hidden-mobile is-hidden-tablet-only"></app-header-buttons>
      </div>
    </div>
  </nav>
</template>
<script>
import AppHeaderButtons from "./AppHeaderButtons";

export default {
  components: {
    AppHeaderButtons
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/custom.scss";

.navbar {
  background: #fafafa !important;
}
.navbar .navbar-start .is-active {
  background: $primary !important;
  color: white !important;
}
@media (max-width: 1023px) {
  .navbar-menu {
    padding: 0px;
    box-shadow: unset;
    .navbar-start {
      background: #fafafa;
      display: flex;
      justify-content: center;
      .navbar-item {
        flex-shrink: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1rem;
        font-size: 0.9rem;
        padding: 12px 8px;
        width: 100%;
      }
    }
  }
}
</style>
