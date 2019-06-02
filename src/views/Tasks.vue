<template>
  <section class="atividades pt">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
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
          <br>
          <div class="field">
            <label class="label">Tipo de atividade</label>
          </div>
          <div class="field">
            <b-checkbox v-model="filters.plugged.yes">Plugada</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="filters.plugged.no">Desplugada</b-checkbox>
          </div>

          <br>
          <div class="field">
            <label class="label">Objeto de conhecimento</label>
          </div>
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
        <div class="column">
          <task-list :tasks="tasks"></task-list>
        </div>
      </div>
    </div>
  </section>
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
    // setAgeGroup(group) {
    //   this.filters.age = group;
    // },
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
