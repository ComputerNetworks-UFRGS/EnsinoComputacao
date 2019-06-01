<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <div
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <small>Recuperar senha</small>
              </div>
              <form role="form">
                <input
                  alternative
                  class="mb-3"
                  placeholder="E-mail cadastrado"
                  addon-left-icon="ni ni-email-83"
                >

                <div class="text-center">
                  <button type="primary" class="my-4">Recuperar senha</button>
                </div>
              </form>
            </template>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/login" class="text-light">
                <small>Entrar</small>
              </router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/cadastro" class="text-light">
                <small>Criar conta</small>
              </router-link>
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
