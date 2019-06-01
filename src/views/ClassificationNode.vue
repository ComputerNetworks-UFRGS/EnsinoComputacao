<template>
    <li class="list-group-item" v-on:click.stop.prevent="isOpen = !isOpen">
        <span v-if="node.items">
            <div class=" pull-right">
                <span class="badge badge-pill badge-light" v-if="showSkillCount">
                    {{ node.items.length }} 
                    <span v-if="node.items.length > 1">habilidades</span>
                    <span v-else>habilidade</span>
                </span>
                <button class="btn btn-sm">
                    <i class="ni" :class="isOpen ? 'ni-bold-down' : 'ni-bold-right'"></i>
                </button>
            </div>
            <h6>
                <b>{{ node.title }}</b>
            </h6>
            <span v-if="isOpen">
                <br>
                <ul v-for="item of node.items" :key="item.id" class="list-group">
                    <classification-node 
                        @openTaskList="openTaskList" 
                        :node="item" 
                        :show-skill-count="showSkillCount"
                        :open="false"></classification-node>
                </ul>
            </span>
        </span>
        <span v-else>
            <div class="row skill">
                <div class="col-lg-2"><b>{{ node.code }}</b></div>
                <div class="col-lg-10" @click="openTaskList(node)">{{ node.name }}</div>
            </div>
        </span>
    </li>
</template>

<script>
export default {
    name: 'classification-node',
    props: {
        node: Object,
        open: Boolean,
        showSkillCount: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            isOpen: this.open
        }
    },
    methods: {
        openTaskList(node) {
            this.$emit('openTaskList', node)
        },
    },

}
</script>

<style scoped>
    ul {
        /* margin-bottom: 12px; */
    }
    .skill {
        text-align: justify;
        padding: 8px!important;
        font-size: 15px;
        line-height: 17px;
        cursor: pointer;
    }
</style>
