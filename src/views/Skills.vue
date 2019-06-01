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
                <h6 slot="header" class="modal-title" id="modal-title-default">
                    {{ selectedSkill.habilidade_nome }}
                </h6>

                <task-list :tasks="tasks"></task-list>

                <template slot="footer">
                    <button type="link" class="ml-auto" @click="closeListTasks">
                        Fechar
                    </button>
                </template>
            </modal>


            <div class="container">
                <skill-List :years="years" @click="listTasks"></skill-List>
            </div>
        </section>


    </div>
</template>

<script>
import Skills from '@/services/skill'
import Modal from '@/components/Modal'
import TaskList from '@/components/TaskList'
import SkillList from '@/components/SkillList'
import Tasks from '@/services/task'

export default {
    components: {
        Modal,
        TaskList,
        SkillList,
    },
    data() {
        return {
            years: {},
            selectedSkill: false,
            tasks: []
        }
    },
    mounted() {
        Skills.years().then(res => res.data)
            .then(years => this.years = years)
    },
    methods: {
        listTasks(skill) {
            this.selectedSkill = skill
            Tasks.list({
                skills: [skill.habilidade_id],
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
