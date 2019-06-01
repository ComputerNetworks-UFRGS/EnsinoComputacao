<template>
  <section class="register">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input v-model="user.name" alternative class="input" placeholder="Nome">
            </div>
            <div class="help is-danger" v-if="errors.name.length > 0">
              <div v-for="error in errors.name" :key="error">{{ error }}</div>
            </div>
          </div>

          <div class="field">
            <label class="label">E-mail</label>
            <div class="control">
              <input v-model="user.email" alternative class="input" placeholder="E-mail">
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
                class="input"
                placeholder="Senha"
              >
            </div>
            <div class="help is-danger" v-if="errors.password.length > 0">
              <div v-for="error in errors.password" :key="error">{{ error }}</div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="policyChecked">
                Estou de acordo com a política de privacidade
                <a
                  href="#/cadastro"
                  @click="policyOpen=true; return false"
                >Política de privacidade</a>
              </label>
            </div>
            <div class="help is-danger" v-if="errors.policy.length > 0">
              <div v-for="error in errors.policy" :key="error">{{ error }}</div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="register">Criar conta</button>
            </div>
          </div>

          <br>
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
            href="#!"
            class="card-footer-item"
            @click="policyChecked=true;policyOpen=false"
          >Estou de acordo</a>
          <a href="#!" class="card-footer-item" @click="policyOpen=false">Fechar</a>
        </footer>
      </div>
    </b-modal>
  </section>
</template>
<script>
import Modal from "@/components/Modal";
import AuthService from "@/services/auth";

export default {
  components: { Modal },
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
            this.$store.commit("set_user", res.data);
            this.$router.push("/dash");
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
<style>
</style>