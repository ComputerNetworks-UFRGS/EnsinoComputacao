<template>
  <footer class="footer">
    <div class="content container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            &copy;{{year}}&nbsp;
            <a href="http://www.sbc.org.br" target="_blank" rel="noopener">SBC</a>.
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link to="/sobre" class="nav-link">Sobre</router-link>
          </div>
          <div class="level-item">
            <router-link to="/contato" class="nav-link">Contato</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
</style>
