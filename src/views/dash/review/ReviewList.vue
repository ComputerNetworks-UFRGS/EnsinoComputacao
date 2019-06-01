<template>
    <div>
        <br>
        <h3>Revisão de atividades</h3>
        <div class="card">
            <div class="card-body">
                <div class="row mb-2" v-for="task of tasks" :key="task.id">
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
                        <router-link 
                            v-auth="'review.detail'"
                            v-if="task.status == 1"
                            :to="'/dash/revisao/' + task.id" 
                            class="btn btn-sm btn-light"> 
                            Avaliar
                        </router-link> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Reviews from '@/services/review'
import UserTasks from '@/services/user-task'

export default {
    data() {
        return {
            tasks: []
        }
    },
    created() {
        this.fetchTasks()
    },
    methods: {
        fetchTasks() {
            Reviews.list()
                .then(res => res.data)
                .then(tasks => {
                    this.tasks = tasks
                })
        },
        canPublish(task) {
            return UserTasks.canPublish(task)
        },
        getStatusLabel(task_status) {
            return UserTasks.getStatusLabel(task_status)
        },
        getColorLabel(task_status) {
            return UserTasks.getColorLabel(task_status)
        }
    }
}
</script>

<style>

</style>
