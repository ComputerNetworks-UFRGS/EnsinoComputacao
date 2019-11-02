<template>
  <section class="classificacao pd">
    <div class="container">
      <br />
      <div class="buttons has-addons is-centered">
        <router-link to="/classificacao" class="button is-white">
          Por ano
          <span class="is-hidden-mobile">&nbsp;de ensino</span>
        </router-link>
        <router-link to="/classificacao/arvore" class="button is-white">
          Por eixo
          <span class="is-hidden-mobile">&nbsp;de ensino</span>
        </router-link>
        <router-link to="/classificacao/eixos" class="button is-white">Eixo por ano</router-link>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/assets/custom.scss";

.classificacao {
  .has-addons {
    .button {
      background: transparent !important;
    }
    .router-link-exact-active {
      background: $primary !important;
      color: white !important;
    }
  }
}
</style>

