<template>
  <div>
    <br>
    <router-link to="/dash/curriculos" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4" v-if="graphId">Editar currículo</h4>
    <h4 class="title is-4" v-else>Novo currículo</h4>

    <button
      v-if="graphId"
      @click="remove"
      class="button is-small is-light"
      v-auth="'curri.delete'"
    >Excluir este currículo</button>

    <hr v-auth="'curri.edit'" />

    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input v-model="form.title" class="input" placeholder="Nome">
          </div>
        </div>

        <div class="field">
          <label class="label">Descrição</label>
          <div class="control">
            <input v-model="form.description" class="input" placeholder="Descrição curta">
          </div>
        </div>

        <br>

        <div class="field">
          <!-- <label class="label">Largura dos grupos</label> -->
          <div class="control">
            <label>
              <b-checkbox
                v-model="form.group_by_year"
                :checked="form.group_by_year"
              >Agrupar por ano de ensino?</b-checkbox>
              <!-- <input type="checkbox" v-model="permission.checked" :checked="permission.checked"> -->
            </label>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field" v-if="form.group_by_year">
              <label class="label">Largura do grupo</label>
              <div class="control">
                <input v-model="form.width" class="input" placeholder="Largura">
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field" v-if="form.group_by_year">
              <label class="label">Altura do grupo</label>
              <div class="control">
                <input v-model="form.height" class="input" placeholder="Altura">
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success" @click="create">Criar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Graphs from "@/services/graph";

export default {
  data() {
    return {
      graphId: false,
      form: {
        title: "",
        description: "",
        group_by_year: 0,
        width: 300,
        height: 150,
      },
      errors: {
        title: [],
        description: [],
        group_by_year: [],
        width: [],
        height: [],
      }
    };
  },
  created() {
    this.graphId = this.$route.params.id;
    console.log('graphId', this.graphId)
    
    if (this.graphId) {
      Graphs.detail(this.graphId)
        .then(res => res.data)
        .then(graph => {
          console.log('graph', graph)
          this.form = graph;
        });
    }
  },
  methods: {
    create() {
      for (let k in this.errors) {
        this.errors[k] = [];
      }

      let data = {
        title: this.form.title,
        description: this.form.description,
        width: this.form.width,
        height: this.form.height,
        group_by_year: this.form.group_by_year
      };

      let request = "";
      if (this.graphId) {
        request = Graphs.update(this.graphId, data);
      } else {
        request = Graphs.create(data);
      }

      request.then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/curriculos");
        } else {
          for (let k in res.data) {
            this.errors[k] = res.data[k];
          }
        }
      });
    },
    remove() {
      this.$dialog.confirm({
        message: "Confirma exclusão de currículo?",
        onConfirm: () => {
          Graphs.remove(this.graphId).finally(() => {
            this.$router.push("/dash/curriculos");
          });
        }
      });
    },
  }
};
</script>

<style>
</style>
