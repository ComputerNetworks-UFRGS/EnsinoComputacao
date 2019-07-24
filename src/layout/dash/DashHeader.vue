<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <dash-header-buttons class="is-hidden-desktop is-pulled-right"></dash-header-buttons>

      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="img/brand/color.png" alt="compeduba" />
        </router-link>
      </div>

      <dash-header-buttons class="is-hidden-mobile is-hidden-tablet-only"></dash-header-buttons>
    </div>
  </nav>
</template>

<script>
import DashHeaderButtons from "./DashHeaderButtons";

export default {
  components: {
    DashHeaderButtons
  }
};
</script>

<style scoped>
.navbar {
  background: #fafafa !important;
}
</style>