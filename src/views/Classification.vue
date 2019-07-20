<template>
  <section class="classificacao pd">
    <div class="container">
      <br />
      <div class="buttons has-addons is-centered">
        <router-link to="/classificacao" class="button is-white">
          Hierarquia
          <span class="is-hidden-mobile">&nbsp;de objetos</span>
        </router-link>
        <router-link to="/classificacao/por-ano" class="button is-white">
          Por ano
          <span class="is-hidden-mobile">&nbsp;de ensino</span>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {};
</script>
