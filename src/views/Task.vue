<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
                <div shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                            </div>
                            <div class="col-lg-4 order-lg-3">
                                <div class="card-profile-actions py-4 mt-0">
                                    <!-- <button type="info" size="sm" class="mr-4">Comentar</button> -->
                                    <button type="default" @click="print" class="float-right">Imprimir</button>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div v-if="task.skill">
                                        <span class="heading">
                                            {{ task.skill.idade_nome }}
                                        </span>
                                        <span class="description">Recomendado</span>
                                    </div>
                                    <div>
                                        <span class="heading">-- <small>min</small></span>
                                        <span class="description">Duração</span>
                                    </div>
                                    <div>
                                        <span class="heading">--</span>
                                        <span class="description">Comentários</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-2 border-top">
                            <div class="row justify-content-center">
                                <div class="col-lg-12">
                                    <h3>{{ task.title }}</h3>
                                    <div class="h6 font-weight-300" v-if="task.user">
                                        Criado por: {{ task.user.name }}
                                    </div>
                                    <br>
                                    <div class="task">
                                        <span v-html="task.description"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Tasks from '@/services/task'

export default {
    data() {
        return {
            task: []
        }
    },
    created() {
        Tasks.detail(this.$route.params.id).then(res => res.data)
            .then(task => this.task = task)
    },
    methods: {
        print: function() {
            window.print()
        }
    }
};
</script>
<style lang="scss">
    .task {
        img {
            width: 100%;
            max-width: 100%;
        }
    }
</style>
