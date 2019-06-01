<template>
  <section class="home">
    <div class="container">
      <div class="section-a">
        <img src="img/brand/color.png" style="width: 200px;" class="img-fluid">

        <p>
          Encontre atividades que seguem as diretrizes para o ensino
          de Computação na Educação Básica recomendadas pela SBC
        </p>

        <router-link to="/atividades" class="button is-primary">Encontre atividades</router-link>

        <div>
          Criado por
          <a
            href="http://www.sbc.org.br"
            target="_blank"
            title="SBC - Sociedade Brasileira de Computação"
          >
            <img src="img/brand/logo-sbc.jpg" style="height: 60px;">
          </a>
        </div>
      </div>
      <hr>
      <div class="section-b">
        <h2>
          Saiba mais
          <br>Conhece as Diretrizes para ensino de Computação na Educação Básica?
        </h2>
        <img src="img/graph_diretrizes.png">

        <p>
          A
          <a href="http://www.sbc.org.br" target="_blank">Sociedade Brasileira de Computação (SBC)</a>
          entende que é fundamental e estratégico para o Brasil que conteúdos de Computação
          sejam ministrados na Educação Básica. Nos útimos dois anos uma comissão, designada
          pela Diretoria de Educação trabalhou na elaboração de um documento que trata dos
          referenciais de formação em Computação para a Educação Básica.
        </p>
        <a
          target="_blank"
          href="http://sbc.org.br/documentos-da-sbc/send/203-educacao-basica/1220-bncc-em-itinerario-informativo-computacao-2"
          class="btn btn-primary mb-3 mb-sm-0"
        >Baixar documento</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "home"
};
</script>
