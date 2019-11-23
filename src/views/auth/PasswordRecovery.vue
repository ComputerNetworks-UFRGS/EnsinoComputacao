<template>
  <section class="recuperar-senha pd">
    <div class="container">
      <br />
      <div class="title-wrapper has-text-centered">
        <h2 class="title is-2 is-spaced">Recuperar senha</h2>
        <h3 class="subtitle is-5 is-muted">
          <router-link to="/entrar">Voltar</router-link>
        </h3>
        <div class="divider is-centered"></div>
      </div>

      <div class="content-wrapper">
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
                />
              </div>
            </div>
            <br>
            <div class="field">
              <div class="control">
                <div class="form-footer has-text-centered mt-10">
                  <button class="button cta is-large primary-btn raised is-clear">Recuperar senha</button>
                </div>
              </div>
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
<style scoped>
input {
  height: 60px;
  font-size: 24px;
}
</style>
