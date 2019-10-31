<template>
  <div>
    <div v-if="node && node.learnig_object">
      <h4 class="title is-4 has-text-centered">{{ node.learnig_object.name }}</h4>
      <hr />
      <!-- <div>
                    <b>Habilidades trabalhadas</b>
                    <ul>
                        <li class="list" v-for="skill of node.learnig_object.skills" :key="skill.id">{{ skill.name }}</li>
                    </ul>
                </div>
                <div>
                    <b>Pré-requisitos</b>
                    <ul>
                        <li class="list" v-for="dependency of node.dependencies" :key="dependency.id">{{ dependency.title }}</li>
                    </ul>
                </div>
                <div>
                    <b>Libera</b>
                    <ul>
                        <li class="list" v-for="dependent of node.dependents" :key="dependent.id">{{ dependent.title }}</li>
                    </ul>
                </div>
      <hr />-->

      <h5 class="title is-5">
        Atividades relacionadas
        <button
          @click="isFiltersOpen = !isFiltersOpen"
          class="button button is-light is-pulled-right"
          :class="{'is-menu-open': isFiltersOpen}"
        >
          <span class="icon">
            <i class="fas" :class="'fa-sliders-h'"></i>
          </span>
          <span>Filtros</span>
          <span class="icon">
            <i
              class="fas"
              :class="{
            'fa-angle-down': isFiltersOpen,
            'fa-angle-right': !isFiltersOpen,
          }"
            ></i>
          </span>
        </button>
      </h5>

      <div class="filters" :class="{'is-hidden': !isFiltersOpen}">
        <div class="field">
          <label class="label">Tipo de atividade</label>
        </div>
        <div class="field">
          <b-checkbox v-model="filters.unplugged">Não precisa de computador</b-checkbox>
        </div>
        <div class="field">
          <label class="label">Com uma das TAGs</label>

          <b-taginput
            v-model="filters.tags"
            :data="filteredTags"
            :allow-new="false"
            autocomplete
            :open-on-focus="false"
            field="value"
            placeholder="Atividades relacionadas com..."
            @typing="getFilteredTags"
          ></b-taginput>
        </div>
      </div>

      <br />

      <div v-if="isLoading" class="loading">
        <b-loading :is-full-page="false" :active="isLoading" :can-cancel="false"></b-loading>
      </div>
      <div v-else>
        <task-list v-if="tasks.length > 0" :tasks="tasks" :is-mobile="true"></task-list>
        <div v-else>
          <h5
            class="title is-5"
          >Nenhuma atividade encontrada para o objeto de ensino {{ node.learnig_object.name }}.</h5>

          <div class="card">
            <div class="card-content">
              Faça parte e contribua incluindo uma atividade relacionada com esse Objeto de
              Aprendizado.
              <br />
              <router-link to="/dash/atividades/criar" class="button is-primary">Contribuir</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tasks from "@/services/task";
import Tags from "@/services/tags";
import TaskList from "@/components/TaskList";
import _ from "lodash";

export default {
  name: "graph-node-detail",
  props: {
    node: {
      default: undefined
    }
  },
  components: {
    TaskList
  },
  data() {
    return {
      tasks: [],
      tags: [],
      filteredTags: [],
      isFiltersOpen: false,
      filters: {
        unplugged: false,
        tags: []
      },
      isLoading: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      Tags.list()
        .then(res => res.data)
        .then(tags => {
          this.tags = tags;
        });
    },
    fetchTasks() {
      this.isLoading = true;
      let params = {};
      if (this.filters.unplugged) {
        params["plugged"] = 0;
      }
      if (this.node && this.node.learnig_object) {
        params["objects"] = [this.node.learnig_object.id];
      }
      if (this.filters.tags.length > 0) {
        params["tags"] = _.map(this.filters.tags, tag => tag.id);
      }

      Tasks.list(params)
        .then(res => res.data)
        .then(tasks => {
          this.tasks = tasks;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getFilteredTags(text) {
      let notIncluded = _.differenceBy(this.tags, this.filters.tags, "id");
      this.filteredTags = _.filter(notIncluded, tag => {
        return (
          tag.value
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    }
  },
  watch: {
    node(val) {
      this.fetchTasks();
    },
    filters: {
      handler: function() {
        this.fetchTasks();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.filters {
  padding: 12px;
  background: #f5f5f5;
  border-radius: 6px;
  margin-top: 9px;
  margin-bottom: 12px;
}
.loading {
  position: relative;
  min-height: 200px;
  border-radius: 12px;
  overflow: hidden;
}
</style>