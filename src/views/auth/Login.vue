<template>
  <section class="login">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5">
          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input
                v-model="email"
                alternative
                class="input"
                placeholder="E-mail"
                addon-left-icon="ni ni-email-83"
              >
            </div>
          </div>

          <div class="field">
            <div class="label">Senha</div>
            <div class="control">
              <input
                v-model="password"
                alternative
                class="input"
                type="password"
                placeholder="Senha"
                addon-left-icon="ni ni-lock-circle-open"
              >
            </div>
          </div>

          <b-message
            title="Ops!"
            type="is-danger"
            v-if="errorMessage" @close="errorMessage=false"
            aria-close-label="Close message"
          >
            {{ errorMessage }}
          </b-message>

          <div class="field">
            <div class="control">
              <button type="primary" class="button is-primary" @click="login">Entrar</button>
            </div>
          </div>

          <hr>

          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <router-link to="/recuperar-senha" class="text-light">
                  <small>Esqueceu a senha?</small>
                </router-link>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <router-link to="/cadastro" class="text-light">
                  <small>Primeiro acesso</small>
                </router-link>
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
      })
        .then(res => {
          console.log("res", res);
          if (res.status == 200) {
            localStorage.setItem("token", res.data.token);
            this.$store.commit("set_user", res.data);
            this.$router.push("/dash");
          } else {
            console.log("????", res.data.message);
            this.errorMessage = res.data.message;
          }
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
        });
    }
  }
};
</script>
<style>
</style>
