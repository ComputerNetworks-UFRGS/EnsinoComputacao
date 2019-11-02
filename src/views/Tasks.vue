<template>
  <section class="atividades pd">
    <div class="container">
      <div class="columns">
        <div class="column is-narrow">
          <button
            @click="isFiltersOpen = !isFiltersOpen"
            class="is-hidden-tablet button button is-light"
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

          <div class="filters" :class="{'is-hidden-mobile': !isFiltersOpen}">
            <div class="field">
              <label class="label">Ano recomendado</label>
            </div>
            <div class="field">
              <b-radio v-model="filters.age" native-value="todos">Todos os anos</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="filters.age" native-value="iniciais">Anos iniciais</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="filters.age" native-value="finais">Anos finais</b-radio>
            </div>
            <div class="field">
              <b-radio v-model="filters.age" native-value="medio">Ensino médio</b-radio>
            </div>
            <div class="field">
              <label class="label">Tipo de atividade</label>
            </div>
            <div class="field">
              <b-checkbox v-model="filters.plugged.no">Não precisa de computador</b-checkbox>
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
          <!-- <br />
          <div class="field">
            <label class="label">Objeto de conhecimento</label>
          </div>
          <ul class="list-group">
            <div v-for="axis of tree" :key="axis.id">
              <div @click="axis.active = !axis.active" class="cursor">
                <small>
                  <i class="ni" :class="axis.active ? 'ni-bold-down' : 'ni-bold-right'"></i>
                  <b>{{ axis.name }}</b>
                </small>
              </div>
              <div v-for="object of axis.objects" :key="object.id" v-show="axis.active">
                <b-checkbox v-model="object.active">
                  <small>{{ object.name }}</small>
                </b-checkbox>
              </div>
            </div>
          </ul>-->
        </div>
        <div class="column">
          <task-list :tasks="tasks" :paginated="true" :pagination="pagination" @changePage="changePage"></task-list>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
  </section>
</template>

<script>
import Tasks from "@/services/task";
import Tags from "@/services/tags";
import TaskList from "@/components/TaskList";
import _ from "lodash";

export default {
  components: {
    TaskList
  },
  data() {
    return {
      isLoading: false,
      tasks: [],
      filters: {
        plugged: {
          yes: false,
          no: false
        },
        age: "todos",
        tags: []
      },
      age_groups: {
        todos: [],
        iniciais: ["01", "02", "03", "04", "05"],
        finais: ["06", "07", "08", "09"],
        medio: ["EM"]
      },
      tags: [],
      filteredTags: [],
      tree: {},
      isFiltersOpen: false,
      pagination: {},
    };
  },
  mounted() {
    this.fetch();
    this.fetchTasks();
    // Skills.tree()
    //   .then(res => res.data)
    //   .then(stage => {
    //     for (let axis of stage.axis) {
    //       this.$set(axis, "active", false);
    //       for (let object of axis.objects) {
    //         this.$set(object, "active", false);
    //       }
    //     }
    //     this.tree = stage.axis;
    //   })
  },
  methods: {
    fetch() {
      Tags.list()
        .then(res => res.data)
        .then(tags => {
          this.tags = tags;
        });
    },
    fetchTasks(page = 1) {
      this.isLoading = true;
      // this.isFiltersOpen = false;
      let params = {};
      if (this.filters.age !== "todos") {
        params["ages"] = this.age_groups[this.filters.age];
      }
      if (this.filters.plugged.yes || this.filters.plugged.no) {
        if (!(this.filters.plugged.yes && this.filters.plugged.no)) {
          params["plugged"] = this.filters.plugged.yes ? 1 : 0;
        }
      }
      let objects = [];
      for (let axis in this.tree) {
        for (let object of this.tree[axis].objects) {
          if (object.active) {
            objects.push(object.id);
          }
        }
      }
      if (objects.length > 0) {
        params["objects"] = objects;
      }

      if (this.filters.tags.length > 0) {
        params["tags"] = _.map(this.filters.tags, tag => tag.id);
      }

      params["paginated"] = true;
      params["page"] = page;

      Tasks.list(params)
        .then(res => res.data)
        .then(pagination => {
          this.pagination = pagination;
          return pagination.data;
        })
        .then(tasks => (this.tasks = tasks))
        .finally(() => {
          this.isLoading = false;
        });
    },
    toggleObject(object) {
      object.active = !object.active;
      this.fetchTasks();
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
    },
    changePage(page) {
      this.fetchTasks(page)
    }
  },
  watch: {
    filters: {
      handler: function() {
        this.fetchTasks();
      },
      deep: true
    },
    tree: {
      handler: function() {
        this.fetchTasks();
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.cursor {
  cursor: pointer;
}
@media (min-width: 768px) {
  .filters {
    max-width: 200px;
  }
}
@media (max-width: 768px) {
  .filters {
    padding: 12px;
    background: #f5f5f5;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .is-menu-open {
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}
</style>
