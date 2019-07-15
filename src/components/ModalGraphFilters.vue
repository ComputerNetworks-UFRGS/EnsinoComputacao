<template>
  <b-modal :active="isOpen" @close="$emit('close')">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">{{ title }}</div>
      </header>

      <div class="card-content">
        <div class="columns">
          <div class="column is-2">
            <label class="label">Anos</label>
            <b-checkbox v-model="selectedYears" native-value="1">1 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="2">2 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="3">3 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="4">4 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="5">5 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="6">6 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="7">7 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="8">8 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="9">9 EF</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="10">1 EM</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="11">2 EM</b-checkbox>
            <br />
            <b-checkbox v-model="selectedYears" native-value="12">3 EM</b-checkbox>
          </div>
          <div class="column is-4">
            <label class="label">Eixo</label>
            <b-checkbox v-model="selectedAxis" native-value="1">Mundo Digital</b-checkbox>
            <br />
            <b-checkbox v-model="selectedAxis" native-value="2">Pensamento Computacional</b-checkbox>
            <br />
            <b-checkbox v-model="selectedAxis" native-value="3">Cultura Digital</b-checkbox>
            <br />
            <br />
            <label class="label">Algum outro filtro</label>
          </div>
        </div>
        <p class="content">
          <b>Selection:</b>
          {{ selectedYears }}
          <b>Selection:</b>
          {{ selectedAxis }}
          <b>Selection:</b>
          {{ separateYears }}
        </p>
      </div>

      <footer class="card-footer">
        <a class="card-footer-item" @click="$emit('close')">Fechar</a>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "modal-graph-filters",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Filtrar"
    }
  },
  data() {
    return {
      selectedYears: [],
      selectedAxis: [],
      separateYears: false
    };
  },
  computed: {
    isOpen() {
      return this.show;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
