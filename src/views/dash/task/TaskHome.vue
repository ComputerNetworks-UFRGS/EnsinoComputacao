<template>
    <div>
        <br>
        <h3>Suas atividades</h3>
        <router-link 
            v-auth="'task.create'"
            to="/dash/atividade/criar" 
            class="btn btn-primary" >
            Criar atividade
        </router-link>
        <br>
        <br>

        <div class="card">
            <div class="card-body">
                <div class="row mb-2" v-for="task of orderedTasks" :key="task.id">
                    <div class="col col-8 nowrap-text">
                        <b>{{ task.title }}</b>&nbsp;
                        <span 
                            class="badge"
                            :class="getColorLabel(task.status)"
                        >
                            {{ getStatusLabel(task.status) }}
                        </span>
                    </div>
                    <div class="col text-right">
                        <div class="btn-group">
                            <button
                                v-if="canPublish(task)"
                                v-auth="'task.edit'"
                                @click="publish(task)"
                                class="btn btn-sm btn-success">
                                <span v-if="task.status == 5">
                                    Publicar nova versão
                                </span>
                                <span v-else>
                                    Publicar
                                </span>
                                
                            </button>
                            <router-link 
                                :to="'/atividade/' + task.id" 
                                v-if="task.status == 4"
                                class="btn btn-sm btn-white">
                                Ver no site
                            </router-link>
                            
                            <router-link 
                                v-auth="'task.detail'"
                                :to="'/dash/atividade/editar/' + task.id" 
                                class="btn btn-sm btn-light">
                                Editar
                            </router-link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <modal-comment 
            :title="'Comentário para revisor'"
            :show.sync="isOpenCommentModal"
            @comment="makeComment($event)"
        ></modal-comment>

    </div>
</template>

<script>
import UserTasks from '@/services/user-task'
import Reviews from '@/services/review'
import _ from 'lodash'
import ModalComment from '@/components/ModalComment'

export default {
    components: {
        ModalComment,
    },
    data() {
        return {
            tasks: [],
            isOpenCommentModal: false,
            selectedTask: false,
        }
    },
    mounted() {
        this.fetch()
    },
    methods: {
        fetch() {
            UserTasks.list().then(res => res.data).then(tasks => {
                this.tasks = tasks
            })  
        },
        canPublish(task) {
            return UserTasks.canPublish(task)
        },
        publish(task) {
            this.selectedTask = task
            this.isOpenCommentModal = true
        },
        getStatusLabel(task_status) {
            return UserTasks.getStatusLabel(task_status)
        },
        getColorLabel(task_status) {
            return UserTasks.getColorLabel(task_status)
        },
        makeComment(comment) {
            let data = {
                comment: comment,
            }
            
            Reviews.create(this.selectedTask.id, data)
                .then(res => {
                    UserTasks.publish(this.selectedTask.id)
                        .then(res => {
                            this.fetch()
                            this.isOpenCommentModal = false
                        })
                })
        }
    },
    computed: {
        orderedTasks: function() {
            return _.orderBy(this.tasks, task => task.id, 'desc')
        }
    }
}
</script>

<style>
    .nowrap-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
