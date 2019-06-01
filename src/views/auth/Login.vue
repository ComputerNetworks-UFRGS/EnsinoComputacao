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
          <base-alert type="danger" dismissible v-if="errorMessage" @close="errorMessage=false">
            <span class="alert-inner--text">
              <strong>Ops!</strong>
              {{ errorMessage }}
            </span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </base-alert>

          <div
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <!-- <template>
                            <div class="text-muted text-center mb-3">
                                <small>Sign in with</small>
                            </div>
                            <div class="btn-wrapper text-center">
                                <button type="neutral">
                                    <img slot="icon" src="img/icons/common/github.svg">
                                    Github
                                </button>

                                <button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </button>
                            </div>
            </template>-->
            <template>
              <div class="text-center text-muted mb-4">
                <small>Acesso com e-mail e senha</small>
              </div>
              <form role="form">
                <input
                  v-model="email"
                  alternative
                  class="mb-3"
                  placeholder="E-mail"
                  addon-left-icon="ni ni-email-83"
                >
                <input
                  v-model="password"
                  alternative
                  type="password"
                  placeholder="Senha"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                <!-- <input type="checkbox" 
                                    Lembrar de mim
                </input type="checkbox" -->
                <div class="text-center">
                  <button type="primary" class="my-4" @click="login">Entrar</button>
                </div>
              </form>
            </template>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/recuperar-senha" class="text-light">
                <small>Esqueceu a senha?</small>
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
import AuthService from "@/services/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: false
    };
  },
  methods: {
    login() {
      AuthService.login({
        email: this.email,
        password: this.password
      }).then(res => {
        console.log("res", res);
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          this.$store.commit("set_user", res.data);
          this.$router.push("/dash");
        } else {
          this.errorMessage = res.data.message;
        }
      });
    }
  }
};
</script>
<style>
</style>
