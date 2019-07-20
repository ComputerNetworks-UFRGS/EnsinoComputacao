<template>
  <section class="atividades pd">
    <div class="container">
      <div class="columns">
        <div class="column is-narrow" style="max-width: 200px">
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
          <br />
          <div class="field">
            <label class="label">Tipo de atividade</label>
          </div>
          <div class="field">
            <b-checkbox v-model="filters.plugged.yes">Plugada</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox v-model="filters.plugged.no">Desplugada</b-checkbox>
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
          </ul> -->
        </div>
        <div class="column">
          <task-list :tasks="tasks"></task-list>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
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
      isLoading: false,
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
    fetchTasks() {
      this.isLoading = true
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

      Tasks.list(params)
        .then(res => res.data)
        .then(tasks => (this.tasks = tasks))
        .finally(() => {
          this.isLoading = false
        })
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
