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
        <div class="container shape-container d-flex"></div>
      </section>
      <!-- 1st Hero Variation -->
    </div>
    <br>
    <section class="section section-lg pt-lg-0">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-8">
                <ul class="nav nav-pills nav-fill nav-justified">
                  <li class="nav-item active" @click="setAgeGroup('todos')">
                    <div
                      class="nav-link cursor"
                      :class="{
                                            'active': this.filters.age == 'todos',
                                        }"
                    >Todos os anos</div>
                  </li>
                  <li class="nav-item" @click="setAgeGroup('iniciais')">
                    <div
                      class="nav-link cursor"
                      :class="{
                                            'active': this.filters.age == 'iniciais',
                                        }"
                    >Anos iniciais</div>
                  </li>
                  <li class="nav-item" @click="setAgeGroup('finais')">
                    <div
                      class="nav-link cursor"
                      :class="{
                                            'active': this.filters.age == 'finais',
                                        }"
                    >Anos finais</div>
                  </li>
                  <li class="nav-item" @click="setAgeGroup('medio')">
                    <div
                      class="nav-link cursor"
                      :class="{
                                            'active': this.filters.age == 'medio',
                                        }"
                    >Ensino médio</div>
                  </li>
                </ul>
              </div>
            </div>
            <hr>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <h5>Tipo de atividade</h5>
            <label for>
              <input type="checkbox" class="mb-2" v-model="filters.plugged.yes">
              Plugada
            </label>
            <label for>
              <input type="checkbox" class="mb-2" v-model="filters.plugged.no">
              Desplugada
            </label>

            <br>
            <h5>Objeto de conhecimento</h5>
            <ul class="list-group">
              <div v-for="eixo of tree" :key="eixo.id">
                <div @click="eixo.active = !eixo.active" class="cursor">
                  <small>
                    <i class="ni" :class="eixo.active ? 'ni-bold-down' : 'ni-bold-right'"></i>
                    <b>{{ eixo.title }}</b>
                  </small>
                </div>
                <div v-for="objeto of eixo.items" :key="objeto.id" v-show="eixo.active">
                  <label for>
                    <input type="checkbox" class v-model="objeto.active">
                    <small>{{ objeto.title }}</small>
                  </label>
                </div>
              </div>
            </ul>
          </div>
          <div class="col-lg-8">
            <div class="row row-grid">
              <div class="col-lg-12">
                <task-list :tasks="tasks"></task-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Tasks from "@/services/task";
import TaskList from "@/components/TaskList";
import Skills from "@/services/skill";

export default {
  components: {
    TaskList
  },
  data() {
    return {
      tasks: [],
      filters: {
        plugged: {
          yes: false,
          no: false
        },
        age: "todos"
      },
      age_groups: {
        todos: [],
        iniciais: ["01", "02", "03", "04", "05"],
        finais: ["06", "07", "08", "09"],
        medio: ["EM"]
      },
      tree: {}
    };
  },
  mounted() {
    this.fetchTasks();
    Skills.tree()
      .then(res => res.data)
      .then(tree => {
        for (let eixo of tree) {
          this.$set(eixo, "active", false);
          for (let objeto of eixo.items) {
            this.$set(objeto, "active", false);
          }
        }
        this.tree = tree;
      });
  },
  methods: {
    fetchTasks() {
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
      for (let eixo in this.tree) {
        for (let objeto of this.tree[eixo].items) {
          if (objeto.active) {
            objects.push(objeto.id);
          }
        }
      }
      if (objects.length > 0) {
        params["objects"] = objects;
      }

      Tasks.list(params)
        .then(res => res.data)
        .then(tasks => (this.tasks = tasks));
    },
    setAgeGroup(group) {
      this.filters.age = group;
    },
    toggleObject(object) {
      object.active = !object.active;
      this.fetchTasks();
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
<style>
.cursor {
  cursor: pointer;
}
</style>
