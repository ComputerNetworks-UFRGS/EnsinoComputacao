<template>
    <div>
        <br />
        <router-link v-auth="'tag.create'" to="/dash/tags/criar" class="button is-success is-pulled-right">Criar nova TAG</router-link>
        <h4 class="title is-4">Tags</h4>
    
        <div class="card">
            <div class="card-content">
                <div v-if="isLoading">
                    <br />
                    <br />
                </div>
                <div v-else>
                    <div class="columns is-hidden-mobile">
                        <div class="column is-4">
                            <b>Identificador</b>
                        </div>
                        <div class="column is-4">
                            <b>Conteúdo</b>
                        </div>
                        <div class="column is-2">
                            <b>Publicada?</b>
                        </div>
                        <div class="column is-2">
                        </div>
                    </div>
    
                    <div class="columns is-mobile" v-for="tag of tags" :key="tag.id">
                        <div class="column is-hidden-mobile is-4">
                            {{ tag.key }}
                        </div>
                        <div class="column">
                            {{ tag.value }}
                        </div>
                        <div class="column is-2">
                            <div class="field">
                                <span class="tag" :class="{'is-success': tag.published}">{{ tag.published ? 'Sim' : 'Não' }}</span>
                            </div>
                        </div>
                        <div class="column is-2">
                            <router-link v-auth="'tag.edit'" :to="'/dash/tags/editar/' + tag.id" class="button is-small is-light">
                                Editar
                            </router-link>
                        </div>
                    </div>
                </div>
                <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
            </div>
        </div>
    </div>
</template>

<script>
import Tags from '@/services/tag'

export default {
    data() {
        return {
            tags: [],
            isLoading: false
        }
    },
    mounted() {
        this.fetch()
    },
    methods: {
        fetch() {
            this.isLoading = true
            Tags.list()
                .then(res => res.data)
                .then(tags => {
                    this.tags = tags
                })
                .finally(() => {
                    this.isLoading = false
                })
        },
    }
}
</script>

<style scoped lang="scss">
.card-content .columns {
    .column {
        padding: 2px;
    }
}
</style>