<template>
  <b-modal :active="isOpen" @close="$emit('close')">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">{{ title }}</div>
      </header>

      <div class="card-content">
        <div class="columns is-centered">
          <div class="column is-8">
            <div class="control">
              <ul>
                <li>Atividade 1</li>
                <li>Atividade 2</li>
                <li>Atividade 3</li>
                <li>Atividade 4</li>
                <li>Atividade 5</li>
                <li>Atividade 6</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer class="card-footer">
        <a class="card-footer-item" @click="$emit('close')">Fechar</a>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "modal-tasks",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Atividades"
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
