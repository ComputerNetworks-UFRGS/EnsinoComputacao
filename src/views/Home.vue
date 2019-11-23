<template>
  <div>
    <!-- <div id="preloader">
      <div id="status"></div>
    </div>-->

    <section class="hero is-fullheight is-default is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-5 is-offset-1 landing-caption">
              <h1 class="title is-1 is-bold is-spaced">Computação para o Ensino Básico</h1>
              <h2 class="subtitle is-5 is-muted">
                Atividades de ensino de Computação para os anos do Ensino Básico, organizadas de
                acordo com a diretrizes de Ensino de Computação da SBC.
              </h2>
              <p>
                <router-link
                  to="/eixos-de-ensino"
                  class="button cta rounded primary-btn raised"
                >Veja as atividades</router-link>
              </p>
            </div>
            <div class="column is-5 is-offset-1">
              <figure class="image is-4by3">
                <img src="img/fresh/images/illustrations/worker.svg" alt="Description" />
              </figure>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="hero-foot mb-20">
        <div class="container">
          <div class="tabs is-centered">
            <ul>
              <li>
                <a>
                  <img class="partner-logo" src="img/fresh/images/logos/clients/systek.svg" />
                </a>
              </li>
              <li>
                <a>
                  <img class="partner-logo" src="img/fresh/images/logos/clients/tribe.svg" />
                </a>
              </li>
              <li>
                <a>
                  <img class="partner-logo" src="img/fresh/images/logos/clients/kromo.svg" />
                </a>
              </li>
              <li>
                <a>
                  <img class="partner-logo" src="img/fresh/images/logos/clients/infinite.svg" />
                </a>
              </li>
              <li>
                <a>
                  <img class="partner-logo" src="img/fresh/images/logos/clients/gutwork.svg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>-->
    </section>

    <section class="section section-feature-grey is-medium">
      <div class="container">
        <div class="title-wrapper has-text-centered">
          <h2 class="title is-2">Eixos de Ensino</h2>
          <h3 class="subtitle is-5 is-muted">Áreas de conhecimento de Computação</h3>
          <div class="divider is-centered"></div>
        </div>

        <div class="content-wrapper">
          <div class="columns">
            <div class="column">
              <div
                class="feature-card is-bordered has-text-centered revealOnScroll delay-2"
                data-animation="fadeInLeft"
              >
                <div class="card-title">
                  <h4>Cultura digital</h4>
                </div>
                <div class="card-icon">
                  <img src="img/fresh/images/illustrations/icons/plug-cloud.svg" />
                </div>
                <div class="card-text">
                  <p>
                    Aborda o
                    <b>letramento em tecnologias digitais</b> e analisa os novos
                    padrões de comportamento e
                    <b>questionamentos</b> morais e éticos na
                    <b>sociedade digitalizada</b>. Busca promover a
                    <b>fluência</b> no uso
                    do
                    <b>conhecimento computacional</b> para expressão de soluções e
                    manifestações culturais de forma contextualizada e crítica.
                  </p>
                </div>
                <div class="card-action">
                  <router-link
                    to="/eixos-de-ensino/cultura-digital"
                    class="button btn-align-md secondary-btn raised"
                  >Conheça</router-link>
                </div>
              </div>
            </div>
            <div class="column is-one-third">
              <div
                class="feature-card is-bordered has-text-centered revealOnScroll delay-1"
                data-animation="fadeInLeft"
              >
                <div class="card-title">
                  <h4>Pensamento Computacional</h4>
                </div>
                <div class="card-icon">
                  <img src="img/fresh/images/illustrations/icons/laptop-cloud.svg" />
                </div>
                <div class="card-text">
                  <p>
                    Se refere à
                    <b>
                      capacidade de compreender, definir, modelar, solucionar,
                      automatizar e analisar problemas de forma metódica e sistemática
                    </b>
                    através de algoritmos. Envolveabstrações e técnicas necessárias
                    para a descrição e análise de informações e processos, bem como para a automação de soluções.
                  </p>
                </div>
                <div class="card-action">
                  <router-link
                    to="/eixos-de-ensino/pensamento-computacional"
                    class="button btn-align-md accent-btn raised"
                  >Conheça</router-link>
                </div>
              </div>
            </div>
            <div class="column">
              <div
                class="feature-card is-bordered has-text-centered revealOnScroll delay-3"
                data-animation="fadeInLeft"
              >
                <div class="card-title">
                  <h4>Mundo Digital</h4>
                </div>
                <div class="card-icon">
                  <img src="img/fresh/images/illustrations/icons/mouse-globe.svg" />
                </div>
                <div class="card-text">
                  <p>
                    Visa fornecer ao estudante a
                    <b>compreensão dos processos que ocorrem no mundo</b>,
                    podendo compreender e criticar tendências, sendo ativo neste cenário.
                    Para compreender de forma estruturada e não apenas efemera identificam-se 3 pilares principais, chamados:
                    <b>codificação, processamento e distribuição</b>.
                  </p>
                </div>
                <div class="card-action">
                  <router-link
                    to="/eixos-de-ensino/mundo-digital"
                    class="button btn-align-md primary-btn raised"
                  >Conheça</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section is-medium">
      <div class="container">
        <div class="columns">
          <div class="column is-centered-tablet-portrait">
            <h1 class="title section-title">Contribua com o Ensino de Computação no Brasil</h1>
            <h3 class="subtitle is-4 is-muted">Cria e compartilhe atividades de ensino de Computação</h3>
            <div class="divider"></div>
          </div>
          <div class="column is-8 mt-60">
            <!-- icon block -->
            <article class="media icon-box">
              <figure class="media-left">
                <p class="image">
                  <img src="img/fresh/images/illustrations/icons/laptop-globe.svg" />
                </p>
              </figure>
              <div class="media-content mt-50">
                <div class="content">
                  <p>
                    <span class="icon-box-title">Crie e organize uma atividade</span>
                    <span class="icon-box-text">
                      Crie em poucos minutos uma atividade, selecione as habiliades que
                      ela estimula no estudante e assim ela já estará inserida no contexto
                      de ensino das diretrizes.
                    </span>
                  </p>
                </div>
              </div>
            </article>
            <!-- /icon block -->

            <!-- icon block -->
            <article class="media icon-box">
              <figure class="media-left">
                <p class="image">
                  <img src="img/fresh/images/illustrations/icons/doc-sync.svg" />
                </p>
              </figure>
              <div class="media-content mt-50">
                <div class="content">
                  <p>
                    <span class="icon-box-title">Tenha o material revisado e aprovado</span>
                    <span class="icon-box-text">
                      Todas as atividades criadas são revisadas e devem ter sua publicação
                      aprovada pela comunidade CompEduBa! antes de ficarem disponíveis publicamente.
                    </span>
                  </p>
                </div>
              </div>
            </article>
            <!-- /icon block -->

            <!-- icon block -->
            <article class="media icon-box">
              <figure class="media-left">
                <p class="image">
                  <img src="img/fresh/images/illustrations/icons/mobile-feed.svg" />
                </p>
              </figure>
              <div class="media-content mt-50">
                <div class="content">
                  <p>
                    <span class="icon-box-title">Compartilhe como quiser</span>
                    <span class="icon-box-text">
                      Após aprovada, a atividade ficará disponível no CompEduBa!
                      dentro do contexto das diretrizes e com link direto que pode ser compartilhado como desejar.
                    </span>
                  </p>
                </div>
              </div>
            </article>
            <!-- /icon block -->
          </div>
        </div>
      </div>
    </section>

    <br />
    <br />

    <section class="section section-feature-grey is-medium">
      <div class="container">
        <div class="columns">
          <div class="column is-10 is-offset-1">
            <div class="has-text-centered">
              <img class="pushed-image" src="img/fresh/images/illustrations/mockups/app-mockup.png" />
            </div>
          </div>
        </div>

        <div class="title-wrapper has-text-centered">
          <h2 class="title is-2">Comece a contribuir</h2>
          <h3 class="subtitle is-5 is-muted">Acesse sua conta e crie uma atividade.</h3>
        </div>

        <p class="has-text-centered mt-20">
          <router-link
            to="/dash/atividades/criar"
            class="button cta is-large rounded secondary-btn raised"
          >Criar atividade</router-link>
        </p>
      </div>
    </section>

    <section class="section is-medium section-secondary">
      <div class="container">
        <div class="title-wrapper has-text-centered">
          <h2 class="title is-2 light-text is-spaced">Sobre as diretrizes</h2>
          <h3
            class="subtitle is-5 light-text"
          >Saiba mais sobre as Diretrizes para ensino de Computação na Educação Básica</h3>
        </div>

        <div class="content-wrapper">
          <div class="columns is-vcentered">
            <div class="column is-4">
              <figure class="testimonial">
                <blockquote>É fundamental e estratégico para o Brasil que conteúdos de Computação sejam ministrados na Educação Básica.</blockquote>
                <div class="author">
                  <!-- <img src="img/fresh/images/illustrations/faces/1.png" alt /> -->
                  <!-- <h5>Irma Walters</h5>
                  <span>Accountant</span>-->
                </div>
              </figure>
            </div>
            <div class="column is-4">
              <figure class="testimonial">
                <blockquote>Comissão designada pela Diretoria de Educação elaborou um documento que trata dos referenciais de formação em Computação para a Educação Básica.</blockquote>
                <div class="author">
                  <!-- <img src="img/fresh/images/illustrations/faces/2.png" alt /> -->
                  <!-- <h5>John Bradley</h5> -->
                  <!-- <span>Financial Analyst</span> -->
                </div>
              </figure>
            </div>
            <div class="column is-4">
              <figure class="testimonial">
                <blockquote>O documento trata das competências e habilidades que compõem a Computação na Educação Básica, da Educação Infantil até o Ensino Médio.</blockquote>
                <div class="author">
                  <!-- <img src="img/fresh/images/illustrations/faces/3.png" alt />
                  <h5>Gary Blackman</h5>
                  <span>HR Manager</span>-->
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
      <p class="has-text-centered mt-20">
        <router-link
          to="/diretrizes-para-ensino-de-computacao-na-educacao-basica"
          class="button cta is-large rounded raised"
        >Conheça as diretrizes</router-link>
      </p>
    </section>

    <section class="section section-light-grey is-medium">
      <contact-form></contact-form>
    </section>

    <div id="auth-modal" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="flex-card auth-card">
          <div class="tabs-wrapper">
            <div class="tabs">
              <ul>
                <li class="is-active" data-tab="login-tab">
                  <a>Login</a>
                </li>
                <li data-tab="register-tab">
                  <a>Register</a>
                </li>
              </ul>
            </div>
            <div id="login-tab" class="tab-content is-active">
              <div class="field">
                <label>Username</label>
                <div class="control">
                  <input type="text" class="input is-medium" placeholder="Enter username" />
                </div>
              </div>
              <div class="field">
                <label>Password</label>
                <div class="control">
                  <input type="password" class="input is-medium" placeholder="Enter password" />
                </div>
              </div>

              <a class="button is-fullwidth secondary-btn is-rounded raised">Log in</a>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <div id="backtotop">
      <a href="#"></a>
    </div>
  </div>
</template>
<script>
import ContactForm from "@/components/ContactForm";
export default {
  components: {
    ContactForm
  }
};
</script>
