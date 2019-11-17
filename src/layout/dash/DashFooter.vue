<template>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns">
        <div class="column is-mobile is-centered has-text-centered">
          <div class="footer-logo">
            <img src="img/fresh/images/logos/fresh-white-alt.svg" />
            <br />
            <a
              href="http://www.sbc.org.br"
              target="_blank"
              rel="noopener"
              style="color: white;"
            >&copy;SBC {{year}}</a>
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
