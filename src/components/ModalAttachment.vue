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

            <b-field class="file">
              <b-upload v-model="file">
                <a class="button is-primary">
                  <span class="icon">
                    <font-awesome-icon icon="upload" />
                  </span>
                  <span v-if="file && file.name">Alterar arquivo</span>
                  <span v-else>Clique para adicionar</span>
                </a>
              </b-upload>
              <span class="file-name" v-if="file">{{ file.name }}</span>
            </b-field>
          </div>
        </div>
      </div>

      <footer class="card-footer">
        <a href.prevent="#!" class="card-footer-item" @click="add">Salvar anexo</a>
        <a href.prevent="#!" class="card-footer-item" @click="$emit('close')">Cancelar</a>
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
      file: null,
      attachment: {
        title: "",
        description: ""
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
      let formData = new FormData();
      formData.append("title", this.attachment.title);
      formData.append("description", this.attachment.description);
      formData.append("file", this.file);
      this.reset();
      this.$emit("add", formData);
    },
    reset() {
      this.description = {
        title: "",
        description: ""
      };
      this.file = null;
    }
  }
};
</script>

<style>
</style>
