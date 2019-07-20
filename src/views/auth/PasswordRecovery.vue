<template>
  <section class="recuperar-senha pd">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5">
          <div class="field">
            <label class="label">Recuperar senha</label>
            <div class="control">
              <input
                alternative
                class="input"
                placeholder="E-mail cadastrado"
                addon-left-icon="ni ni-email-83"
              >
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary">Recuperar senha</button>
            </div>
          </div>

          <hr>

          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <router-link to="/login">Entrar</router-link>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <router-link to="/cadastro">Primeiro acesso</router-link>
              </div>
            </div>
          </div>
          <br>
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
