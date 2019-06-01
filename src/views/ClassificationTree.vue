<template>
    <div>

        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape shape-style-1 shape-default">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <br>
        <section class="section section-lg pt-lg-0">


            <modal :show="selectedSkill !== false" @close="selectedSkill = false">
                <h6 slot="header" class="modal-title">
                    {{ selectedSkill.name }}
                </h6>

                <task-list :tasks="tasks"></task-list>

                <template slot="footer">
                    <button type="link" class="ml-auto" @click="closeListTasks">
                        Fechar
                    </button>
                </template>
            </modal>


            <div class="container">
                
                <ul class="list-group">
                    <classification-node
                        @openTaskList="listTasks"
                        v-for="node of tree" :key="node.id" 
                        :node="node"
                        :open="false"></classification-node>
                </ul>
            
            </div>
        </section>

    </div>
</template>

<script>
import Skills from '@/services/skill'
import Tasks from '@/services/task'
import Modal from '@/components/Modal'
import ClassificationNode from './ClassificationNode'
import TaskList from '@/components/TaskList'

export default {
    components: {
        ClassificationNode,
        Modal,
        TaskList,
    },
    data() {
        return {
            tree: {},
            selectedSkill: false,
            tasks: [],
        }
    },
    mounted() {
        Skills.tree().then(res => res.data)
            .then(tree => this.tree = tree)
    },
    methods: {
        listTasks(skill) {
            this.selectedSkill = skill
            Tasks.list({
                skills: [skill.id],
            }).then(res => res.data)
                .then(tasks => this.tasks = tasks)
        },
        closeListTasks() {
            this.selectedSkill = false
            this.tasks = []
        }
    }
};
</script>

<style scoped lang="scss">

</style>
