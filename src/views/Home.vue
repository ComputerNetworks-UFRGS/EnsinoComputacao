<template>
  <div class="home">
    <section class="section-hero section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew">
        <span class="span-150"></span>
        <span class="span-50"></span>
        <span class="span-50"></span>
        <span class="span-75"></span>
        <span class="span-100"></span>
        <span class="span-75"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
      </div>
      <div class="container shape-container d-flex align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col-lg-8 text-center pt-lg">
              <img src="img/brand/white.png" style="width: 200px;" class="img-fluid">
              <p class="lead text-white mt-4 mb-5">
                Encontre atividades que seguem as diretrizes para o ensino
                de Computação na Educação Básica recomendadas pela SBC
              </p>

              <div class="container">
                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <br>
                    <router-link
                      to="/atividades"
                      class="btn btn-primary btn-lg btn-block"
                    >Encontre atividades</router-link>
                  </div>
                  <div class="col-md-3"></div>
                </div>
              </div>
              <div class="btn-wrapper"></div>
            </div>
          </div>
          <div class="row align-items-center justify-content-around stars-and-coded">
            <div class="col-sm-4">
              <!-- <span class="text-white alpha-7 ml-3">Contribua</span>
                        <a href="https://github.com/tmazza/tc-app" target="_blank" title="Support us on Github">
                            <img src="img/brand/github-white-slim.png" style="height: 22px; margin-top: -3px">
              </a>-->
            </div>
            <div class="col-sm-4 mt-4 mt-sm-0 text-right">
              <span class="text-white alpha-7">Criado por</span>
              <a
                href="http://www.sbc.org.br"
                target="_blank"
                title="SBC - Sociedade Brasileira de Computação"
              >
                <img src="img/brand/logo-sbc.jpg" class="ml-3" style="height: 60px;">
              </a>
              <br>
              <br>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div class="row row-grid justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-4">
              Saiba mais
              <span
                class="text-success"
              >Conhece as Diretrizes para ensino de Computação na Educação Básica?</span>
            </h2>
          </div>
        </div>
        <div class="row row-grid justify-content-center">
          <div class="col-lg-12 text-center">
            <img class="img-fluid" src="img/graph_diretrizes.png">
          </div>
        </div>
        <div class="row row-grid justify-content-center">
          <div class="col-lg-8 text-center">
            <p class="lead text-justify">
              A
              <a
                href="http://www.sbc.org.br"
                target="_blank"
              >Sociedade Brasileira de Computação (SBC)</a>
              entende que é fundamental e estratégico para o Brasil que conteúdos de Computação
              sejam ministrados na Educação Básica. Nos útimos dois anos uma comissão, designada
              pela Diretoria de Educação trabalhou na elaboração de um documento que trata dos
              referenciais de formação em Computação para a Educação Básica.
            </p>
            <div class="btn-wrapper">
              <a
                target="_blank"
                href="http://sbc.org.br/documentos-da-sbc/send/203-educacao-basica/1220-bncc-em-itinerario-informativo-computacao-2"
                class="btn btn-primary mb-3 mb-sm-0"
              >Baixar documento</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
