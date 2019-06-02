<template>
  <b-modal :active="isOpen" @close="$emit('update:show', false)">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">{{ title }}</div>
      </header>

      <div class="card-content">
        <div class="columns is-centered">
          <div class="column is-8">
            <div class="field">
              <label class="label">Título</label>
              <div class="control">
                <input class="input" v-model="attachment.title" placeholder="Título">
              </div>
            </div>

            <div class="field">
              <label class="label">Descrição</label>
              <div class="control">
                <input class="input" v-model="attachment.description" placeholder="Descrição curta">
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="card-footer">
        <a href="#!" class="card-footer-item" @click="add">Salvar anexo</a>
        <a href="#!" class="card-footer-item" @click="$emit('close')">Cancelar</a>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "modal-attachment",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Anexo de atividade"
    }
  },
  data() {
    return {
      attachment: {
        title: "",
        description: "",
        file: ""
      }
    };
  },
  computed: {
    isOpen() {
      return this.show;
    }
  },
  methods: {
    add() {
      this.$emit("add", this.attachment);
    }
  }
};
</script>

<style>
</style>
