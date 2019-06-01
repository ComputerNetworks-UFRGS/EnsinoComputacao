<template>
    <div>
        <h3>Novo perfil de usuário</h3>

        <router-link to="/dash/papeis" class="btn btn-secondary">Cancelar</router-link>
        <br>
        <br>
        <div class="row">
            <div class="col col-lg-8">
                <div class="box">
                    <form role="form">
                        <input v-model="form.title"
                                    alternative
                                    class="mb-3"
                                    placeholder="Nome">
                        
                        <!-- <base-alert type="danger" dismissible @close="errors.title = []" :visible="errors.title.length > 0">
                            
                            <span class="alert-inner--text">
                                <div v-for="error in errors.title" :key="error">
                                    {{ error }}
                                </div>
                            </span>
                            
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </base-alert> -->

                        <input v-model="form.description"
                                    alternative
                                    class="mb-3"
                                    placeholder="Descrição curta">
                        

                        <!-- <base-alert type="danger" dismissible @close="errors.description = []" :visible="errors.description.length > 0">
                            
                            <span class="alert-inner--text">
                                <div v-for="error in errors.description" :key="error">
                                    {{ error }}
                                </div>
                            </span>
                            
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </base-alert> -->
                        <div class="">
                            <button type="primary" class="my-4" @click="create">
                                Criar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Roles from '@/services/role'

export default {
    data() {
        return {
            form: {
                title: '',
                description: '',
            },
            errors: {
                title: [],
                description: [],
            },
        }
    },
    methods: {
        create() {

            for(let k in this.errors) {
                this.errors[k] = []
            }

            let data = {
                title: this.form.title,
                description: this.form.description,
            }

            Roles.create(data)
                .then(res => {
                    if(res.status == 200) {
                        this.$router.push('/dash/papeis')
                    } else {
                        for(let k in res.data) {
                            this.errors[k] = res.data[k]
                        }
                    }
                })

        },
    }
}
</script>

<style>

</style>
