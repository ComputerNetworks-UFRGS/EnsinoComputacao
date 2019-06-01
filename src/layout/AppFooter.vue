<template>
    <footer class="footer has-cards">
        <div class="container container-lg">
            <div class="row">
                <div class="col">
                    <br><br><br><br><br>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row row-grid align-items-center my-md" v-if="!isBasic">
                <div class="col-lg-8">
                    <h3 class="text-primary font-weight-light mb-2">Participe e contribua!</h3>
                    <h4 class="mb-0 font-weight-light">
                        Divulgue e entre em contato através dessas plataformas
                    </h4>
                </div>
                <div class="col-lg-4 text-lg-right btn-wrapper">
                    <a target="_blank" rel="noopener" href="https://twitter.com/sbcbrasil"
                       class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Nos siga">
                        <i class="fa fa-twitter"></i>
                    </a>
                    <a target="_blank" rel="noopener" href="https://www.facebook.com/sbcbrasil"
                       class="btn btn-neutral btn-icon-only btn-facebook btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Curta nossa página">
                        <i class="fa fa-facebook-square"></i>
                    </a>
                    <a target="_blank" rel="noopener" href="https://github.com/tmazza/tc-app"
                       class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg" data-toggle="tooltip"
                       data-original-title="Contribua no Github">
                        <i class="fa fa-github"></i>
                    </a>
                </div>
            </div>
            <hr>
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-6">
                    <div class="copyright">
                        &copy; {{year}}
                        <a href="http://www.sbc.org.br" target="_blank" rel="noopener">SBC</a>.
                    </div>
                </div>
                <div class="col-md-6">
                    <ul class="nav nav-footer justify-content-end">
                        <li class="nav-item">
                            <router-link to="/sobre" class="nav-link">Sobre</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/contato" class="nav-link">Contato</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  props: {
      isBasic: {
          type: Boolean,
          default: false,
      }
  },
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
