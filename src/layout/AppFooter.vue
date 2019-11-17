<template>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="footer-logo">
            <img src="img/fresh/images/logos/fresh-white-alt.svg" />
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Product</h3>
            </div>
            <ul class="link-list">
              <li>
                <a href="#">Discover features</a>
              </li>
              <li>
                <a href="#">Why choose our Product ?</a>
              </li>
              <li>
                <a href="#">Compare features</a>
              </li>
              <li>
                <a href="#">Our Roadmap</a>
              </li>
              <li>
                <a href="#">Request features</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Docs</h3>
            </div>
            <ul class="link-list">
              <li>
                <a href="#">Get Started</a>
              </li>
              <li>
                <a href="#">User guides</a>
              </li>
              <li>
                <a href="#">Admin guide</a>
              </li>
              <li>
                <a href="#">Developers</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Blogroll</h3>
            </div>
            <ul class="link-list">
              <li>
                <a href="#">Latest News</a>
              </li>
              <li>
                <a href="#">Tech articles</a>
              </li>
              <li>
                <a href="#">Video Blog</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Follow Us</h3>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" href="https://github.com/#">
                    <span class="icon">
                      <i class="fa fa-youtube"></i>
                    </span>
                  </a>
                  <a class="level-item" href="https://dribbble.com/#">
                    <span class="icon">
                      <i class="fa fa-dribbble"></i>
                    </span>
                  </a>
                  <a class="level-item" href="https://fb.com/#">
                    <span class="icon">
                      <i class="fa fa-facebook"></i>
                    </span>
                  </a>
                  <a class="level-item" href="https://twitter.com/#">
                    <span class="icon">
                      <i class="fa fa-twitter"></i>
                    </span>
                  </a>
                  <a class="level-item" href="https://bitbucket.org/#">
                    <span class="icon">
                      <i class="fa fa-bitbucket"></i>
                    </span>
                  </a>
                </div>
              </nav>


              <a href="http://www.sbc.org.br" target="_blank" rel="noopener" style="color: white;">&copy;SBC {{year}}</a>
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
