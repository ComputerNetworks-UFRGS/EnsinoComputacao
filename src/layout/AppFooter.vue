<template>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns">
        <div class="column is-2">
          <div class="footer-logo">
            <img src="img/fresh/images/logos/fresh-white-alt.svg" />
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Ensino de Computação</h3>
            </div>
            <ul class="link-list">
              <li>
                <router-link to="/atividades">Repositório de atividades</router-link>
              </li>
              <li>
                <router-link to="/eixos-de-ensino/pensamento-computacional">Pensamento Computacional</router-link>
              </li>
              <li>
                <router-link to="/eixos-de-ensino/mundo-digital">Mundo Digital</router-link>
              </li>
              <li>
                <router-link to="/eixos-de-ensino/cultura-digital">Cultura Digital</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Mais informações</h3>
            </div>
            <ul class="link-list">
              <li>
                <router-link to="/classificacao">Sobre as diretrizes</router-link>
              </li>
              <li>
                <router-link to="/sobre">Sobre a plataforma</router-link>
              </li>
              <li>
                <a href="http://sbc.org.br/institucional-3">Sobre a SBC</a>
              </li>
              <li>
                <router-link to="/contato">Entre em contato</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-2">
          <div class="footer-column">
            <div class="footer-header">
              <h3>CONECTE-SE</h3>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" href="https://www.youtube.com/channel/UCJG9PNzgN-T54nXHswPV93A">
                    <span class="icon">
                      <i class="fa fa-youtube"></i>
                    </span>
                  </a>
                  <a class="level-item" href="https://pt-br.facebook.com/sbcbrasil/">
                    <span class="icon">
                      <i class="fa fa-facebook"></i>
                    </span>
                  </a>
                  <a class="level-item" href="https://twitter.com/sbcbrasil">
                    <span class="icon">
                      <i class="fa fa-twitter"></i>
                    </span>
                  </a>
                </div>
              </nav>
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
