<template>
  <div class="container">
    <div class="title-wrapper has-text-centered">
      <h2 class="title is-2 is-spaced">Entre em contato</h2>
      <h3 class="subtitle is-5 is-muted">Dúvidas ou sugestões?</h3>
      <div class="divider is-centered"></div>
    </div>

    <div class="content-wrapper">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <form>
            <div class="columns is-multiline">
              <div class="column is-6">
                <input class="input is-medium" type="text" placeholder="Digite seu nome" />
              </div>
              <div class="column is-6">
                <input class="input is-medium" type="email" placeholder="Digite seu e-mail" />
              </div>
              <div class="column is-12">
                <textarea class="textarea" rows="10" placeholder="Escreva aqui sua mensagem..."></textarea>
              </div>
              <br />
              <div class="form-footer has-text-centered mt-10">
                <button class="button cta is-large primary-btn raised is-clear">Enviar mensagem</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'contact-form'
};
</script>
<style lang="scss" scoped>
</style>