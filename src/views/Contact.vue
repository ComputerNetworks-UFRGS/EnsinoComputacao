<template>
  <section class="contact-page">
    <div class="container">
      <br>
      <div class="columns is-centered">
        <div class="column is-4">
          <h4 class="title is-4 has-text-centered">Contato</h4>

          <div class="field">
            <label class="label">Seu nome</label>
            <div class="control">
              <input class="input" placeholder="Seu nome">
            </div>
          </div>

          <div class="field">
            <label class="label">Seu e-mail</label>
            <div class="control">
              <input class="input" placeholder="Seu e-mail">
            </div>
          </div>

          <div class="field">
            <label class="label">Mensagem</label>
            <div class="control">
              <textarea
                class="textarea"
                name="name"
                rows="4"
                cols="80"
                placeholder="Digite aqui..."
              ></textarea>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary">Enviar mensagem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style>
</style>
