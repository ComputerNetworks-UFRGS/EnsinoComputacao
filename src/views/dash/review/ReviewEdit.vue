<template>
    <div>
        <h3>Avaliação de atividade</h3>
        <router-link to="/dash/revisao" class="btn btn-secondary btn-sm">
            Voltar
        </router-link>
        <br><br>

        Título: <b>{{ task.title }}</b>
        <br>
        Criada por <b>{{ task.id }}</b>
        <br>
        Requer uso de computador? <b>{{ task.is_plugged ? 'Sim' : 'Não' }}</b>
        <br><br>
        Habilidades cadastradas: 
        <span v-if="task.skills && task.skills.length <= 0"><small>nenhuma</small></span>
        <span v-else>
            <table class="table table-sm">
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                </tr>
                <tr v-for="skill of task.skills" :key="skill.habilidade_id">
                    <td>{{ skill.habilidade_codigo }}</td>
                    <td>{{ skill.habilidade_nome }}</td>
                </tr>
            </table>
        </span>
        <br>
        
        Conteúdo da atividade:
        <div class="card">
            <div class="card-body">
                <div v-html="task.description"></div>
            </div>
        </div>
        
        <review-list 
            :title="'Comentários'"
            :reviews="task.reviews"></review-list>
        
        <hr>
        
        <div class="btn-group" v-auth="'review.evaluate'">
            <button 
                @click="createReview('approved')" 
                class="btn btn-success">
                Aprovar publicação
            </button>
            <button 
                @click="createReview('need_fix')" 
                class="btn btn-warning">
                Solicitar ajustes
            </button>
            <button 
                @click="createReview('denied')" 
                class="btn btn-danger">
                Negar publicação
            </button>
        </div>       

        <modal-comment 
            :show.sync="isOpenCommentModal"
            @comment="makeComment($event)"
        ></modal-comment>

    </div>
</template>

<script>
import Reviews from '@/services/review'
import _ from 'lodash'
import ModalComment from '@/components/ModalComment'
import ReviewList from '@/components/ReviewList'

export default {
    components: {
        ModalComment,
        ReviewList,
    },
    data () {
        return {
            task: {},
            isOpenCommentModal: false,
            selectedStatus: false,
        }
    },
    created() {
        Reviews.detail(this.$route.params.id)
            .then(res => res.data)
            .then(task => {
                this.task = task
            })
    },
    methods: {
        createReview(status) {
            
            let can_comment = true
            let status_id = 2
            if(status == 'need_fix') {
                status_id = 3                
            } else if(status == 'approved') {
                status_id = 4
                can_comment = false
            }

            this.selectedStatus = status_id

            if(can_comment) {
                this.isOpenCommentModal = true
            } else {
                this.setStatus();
            }

        },
        setStatus() {
            let data = {
                status: this.selectedStatus,
            }

            Reviews.setStatus(this.task.id, data)
                .then(res => {
                    this.$router.push('/dash/revisao')
                })
        },
        makeComment(comment) {
            let data = {
                comment: comment,
            }

            Reviews.create(this.task.id, data)
                .then(res => {
                    this.setStatus()
                })
        }
    }
}
</script>

<style>

</style>
