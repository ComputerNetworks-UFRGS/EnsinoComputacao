<template>
  <section class="register pd">
    <div class="container">
      <br />
      <div class="title-wrapper has-text-centered">
        <h2 class="title is-2 is-spaced">Criar conta</h2>
        <h3 class="subtitle is-5 is-muted">
          Já tem uma conta?
          <router-link to="/entrar">Faça login</router-link>
        </h3>
        <div class="divider is-centered"></div>
      </div>

      <div class="content-wrapper">
        <div class="columns is-centered">
          <div class="column is-5">
            <div class="field">
              <label class="label">Nome</label>
              <div class="control">
                <input v-model="user.name" alternative class="input tall" placeholder="Nome" />
              </div>
              <div class="help is-danger" v-if="errors.name.length > 0">
                <div v-for="error in errors.name" :key="error">{{ error }}</div>
              </div>
            </div>

            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input v-model="user.email" alternative class="input tall" placeholder="E-mail" />
              </div>
              <div class="help is-danger" v-if="errors.email.length > 0">
                <div v-for="error in errors.email" :key="error">{{ error }}</div>
              </div>
            </div>

            <div class="field">
              <label class="label">Senha</label>
              <div class="control">
                <input
                  v-model="user.password"
                  alternative
                  type="password"
                  class="input tall"
                  placeholder="Senha"
                />
              </div>
              <div class="help is-danger" v-if="errors.password.length > 0">
                <div v-for="error in errors.password" :key="error">{{ error }}</div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="policyChecked" />
                  Estou de acordo com a política de privacidade
                  <a
                    href.stop="#!"
                    @click="policyOpen=true; return false"
                  >Política de privacidade</a>
                </label>
              </div>
              <div class="help is-danger" v-if="errors.policy.length > 0">
                <div v-for="error in errors.policy" :key="error">{{ error }}</div>
              </div>
            </div>

            <br />
            <div class="field">
              <div class="control">
                <div class="form-footer has-text-centered mt-10">
                  <button
                    class="button cta is-large primary-btn raised is-clear"
                    @click="register"
                  >Criar conta</button>
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>

    <b-modal :active.sync="policyOpen" :width="640" scroll="keep">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Política de privacidade</p>
        </header>
        <div class="card-content">
          <div class="content">
            Lorem ipsum nec dictumst dapibus felis tristique vestibulum accumsan
            platea lacinia a, augue bibendum urna dapibus netus eros vulputate sem
            eu mauris. mattis metus pretium aliquam velit accumsan consequat aliquam
            dapibus, luctus feugiat nulla consectetur volutpat varius tellus rutrum
            habitasse, aliquam litora proin rutrum ante quam tristique. turpis sem
            imperdiet tristique viverra tellus dictum interdum sapien, adipiscing
            viverra fames litora nunc nullam venenatis, non etiam nibh felis leo
            tristique luctus. habitant leo magna potenti nisi vulputate sem, lacinia
            nec sed odio eget, odio pulvinar ultricies sapien consequat. facilisis
            class mattis mi dictumst enim conubia netus platea aliquam ad ultricies,
            fermentum purus lobortis tortor justo phasellus volutpat augue senectus
            aliquam.
          </div>
        </div>
        <footer class="card-footer">
          <a
            href.prevent="#!"
            class="card-footer-item"
            @click="policyChecked=true;policyOpen=false"
          >Estou de acordo</a>
          <a href.prevent="#!" class="card-footer-item" @click="policyOpen=false">Fechar</a>
        </footer>
      </div>
    </b-modal>
  </section>
</template>
<script>
import AuthService from "@/services/auth";
import UserService from "@/services/user";

export default {
  data() {
    return {
      policyOpen: false,
      policyChecked: false,
      user: {
        name: "",
        email: "",
        password: ""
      },
      errors: {
        name: [],
        email: [],
        password: [],
        policy: []
      }
    };
  },
  methods: {
    register() {
      if (!this.policyChecked) {
        this.errors.policy = [
          "Para criar uma conta é preciso estar de acordo com nossa Política de Privacidade."
        ];
        return;
      }

      for (let k in this.errors) {
        this.errors[k] = [];
      }

      AuthService.register(this.user)
        .then(res => {
          if (res.status == 200) {
            localStorage.setItem("token", res.data.token);
            UserService.detail(res.data.token).then(res => {
              this.$store.commit("set_user", res.data);
              this.$router.push("/dash/welcome");
            });
          } else {
            for (let k in res.data) {
              this.errors[k] = res.data[k];
            }
          }
        })
        .catch(err => {
          let errors = err.response.data;
          for (let k in errors) {
            this.errors[k] = errors[k];
          }
        });
    }
  }
};
</script>
<style scoped>
.tall {
  height: 60px;
  font-size: 24px;
}
</style>