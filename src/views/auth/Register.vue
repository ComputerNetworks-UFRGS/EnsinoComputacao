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
                    <div type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
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
                        </template> -->
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Primeiro acesso</small>
                            </div>
                            <form role="form">
                                <input v-model="user.name"
                                            alternative
                                            class="mb-3"
                                            placeholder="Nome"
                                            addon-left-icon="ni ni-hat-3">
                                
                                <base-alert type="danger" dismissible @close="errors.name = []" :visible="errors.name.length > 0">
                                    
                                    <span class="alert-inner--text">
                                        <div v-for="error in errors.name" :key="error">
                                            {{ error }}
                                        </div>
                                    </span>
                                    
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </base-alert>
                                <input v-model="user.email"
                                            alternative
                                            class="mb-3"
                                            placeholder="E-mail"
                                            addon-left-icon="ni ni-email-83">
                                
                                <base-alert type="danger" dismissible @close="errors.email = []" :visible="errors.email.length > 0">
                                    
                                    <span class="alert-inner--text">
                                        <div v-for="error in errors.email" :key="error">
                                            {{ error }}
                                        </div>
                                    </span>
                                    
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </base-alert>
                                <input v-model="user.password"
                                            alternative
                                            type="password"
                                            placeholder="Senha"
                                            addon-left-icon="ni ni-lock-circle-open">
                                
                                <base-alert type="danger" dismissible @close="errors.password = []" :visible="errors.password.length > 0">
                                    
                                    <span class="alert-inner--text">
                                        <div v-for="error in errors.password" :key="error">
                                            {{ error }}
                                        </div>
                                    </span>
                                    
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </base-alert>
                                <!-- <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div> -->
                                <br>
                                <div class="">
                                    <a href="#/cadastro" @click="policyOpen=true; return false">Política de privacidade</a>
                                </div>
                                <label for="">
                                    <input type="checkbox"  v-model="policyChecked" />
                                    <span>Estou de acordo com a política de privacidade</span>
                                </label>
                                
                                <base-alert type="danger" dismissible @close="errors.policy = []" :visible="errors.policy.length > 0" class="mt-4">
                                    
                                    <span class="alert-inner--text">
                                        <div v-for="error in errors.policy" :key="error">
                                            {{ error }}
                                        </div>
                                    </span>
                                    
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </base-alert>
                                <br>
                                <div class="text-center">
                                    <button type="primary" class="my-4" @click="register">
                                        Criar conta
                                    </button>
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
                    </div>
                </div>
            </div>
        </div>


        <Modal :show="policyOpen" @close="policyOpen=false">
            <template v-slot:header>
                Política de privacidade
            </template>
            Lorem ipsum nec dictumst dapibus felis tristique vestibulum accumsan platea lacinia a, augue bibendum urna dapibus netus eros vulputate sem eu mauris. mattis metus pretium aliquam velit accumsan consequat aliquam dapibus, luctus feugiat nulla consectetur volutpat varius tellus rutrum habitasse, aliquam litora proin rutrum ante quam tristique. turpis sem imperdiet tristique viverra tellus dictum interdum sapien, adipiscing viverra fames litora nunc nullam venenatis, non etiam nibh felis leo tristique luctus. habitant leo magna potenti nisi vulputate sem, lacinia nec sed odio eget, odio pulvinar ultricies sapien consequat. facilisis class mattis mi dictumst enim conubia netus platea aliquam ad ultricies, fermentum purus lobortis tortor justo phasellus volutpat augue senectus aliquam. 

            <hr>
            <button class="btn btn-primary" @click="policyOpen=false">Ok</button>

        </Modal>

    </section>
</template>
<script>
import Modal from '@/components/Modal'
import AuthService from '@/services/auth'

export default {
    components: { Modal },
    data() {
        return {
            policyOpen: false,
            policyChecked: false,
            user: {
                name: '',
                email: '',
                password: '',
            },
            errors: {
                name: [],
                email: [],
                password: [],
                policy: []
            }
        }
    },
    methods: {
        register() {

            if(!this.policyChecked) {
                this.errors.policy = ["Para criar uma conta é preciso estar de acordo com nossa Política de Privacidade."]
                return
            }

            for(let k in this.errors) {
                this.errors[k] = []
            }

            AuthService.register(this.user)
                .then(res => {

                    if(res.status == 200) {
                        localStorage.setItem('token', res.data.token)
                        this.$store.commit('set_user', res.data)
                        this.$router.push('/dash/home')
                    } else {
                        for(let k in res.data) {
                            this.errors[k] = res.data[k]
                        }
                    }
                })
        }
    }

};
</script>
<style>
</style>