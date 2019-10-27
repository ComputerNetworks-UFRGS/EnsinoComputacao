<template>
  <section class="home">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h4 class="title is-4">
            Encontre e crie atividades para o ensino de computação.
            <br>
            <br>
            <router-link to="/atividades" class="button is-light">Ver atividades</router-link>
          </h4>
          <a
            href="http://www.sbc.org.br"
            target="_blank"
            class="is-pulled-right"
            title="SBC - Sociedade Brasileira de Computação"
          >
            <img src="img/brand/logo-sbc.jpg" style="height: 60px;">
          </a>
        </div>
      </div>
    </section>

    <div class="container pd">
      <br>
      <br>
      <div class="columns is-centered">
        <div class="column is-8">
          <h4
            class="title is-4 has-text-centered"
          >Conhece as Diretrizes para ensino de Computação na Educação Básica?</h4>
          <br>
          <p>
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
        </div>
      </div>

      <img src="img/graph_diretrizes.png">
      <div class="has-text-centered">
        <a
          target="_blank"
          href="http://sbc.org.br/documentos-da-sbc/send/203-educacao-basica/1220-bncc-em-itinerario-informativo-computacao-2"
          class="button is-primary is-medium"
        >Baixar documento</a>
      </div>
      <br>
      <br>
    </div>
  </section>
</template>

<script>
export default {
  name: "home"
};
</script>
