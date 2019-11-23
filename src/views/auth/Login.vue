<template>
  <section class="login pd">
    <div class="container">
      <br />
      <div class="title-wrapper has-text-centered">
        <h2 class="title is-2 is-spaced">Acessar conta</h2>
        <h3 class="subtitle is-5 is-muted">
          Primeiro acesso?
          <router-link to="/criar-conta">Crie uma conta</router-link>
        </h3>
        <div class="divider is-centered"></div>
      </div>

      <div class="content-wrapper">
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
                  tabindex="1"
                />
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
                  tabindex="2"
                />
              </div>

              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <router-link to="/recuperar-senha">Esqueceu a senha?</router-link>
                  </div>
                </div>
              </div>
            </div>

            <b-message
              title="Ops!"
              type="is-danger"
              v-if="errorMessage"
              @close="errorMessage=false"
              aria-close-label="Fechar"
            >{{ errorMessage }}</b-message>

            <br />

            <div class="field">
              <div class="control">
                <div class="form-footer has-text-centered mt-10">
                  <button
                    class="button cta is-large primary-btn raised is-clear"
                    @click="login"
                    tabindex="3"
                  >Entrar</button>
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AuthService from "@/services/auth";
import UserService from "@/services/user";

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
          if (res.status == 200) {
            localStorage.setItem("token", res.data.token);
            UserService.detail(res.data.token).then(res => {
              this.$store.commit("set_user", res.data);
              this.$router.push("/dash/atividades");
            });
          } else {
            this.errorMessage = res.data.message;
          }
        })
        .catch(err => {
          console.log("err", err);
          this.errorMessage = err.response.data.message;
        });
    }
  }
};
</script>
<style scoped>
input {
  height: 60px;
  font-size: 24px;
}
</style>
