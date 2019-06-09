<template>
  <b-modal :active="show" @close="$emit('update:show', false)">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">Inclusão de tópico</div>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label">Título</label>
            <div class="control">
              <input type="text" class="input" v-model="topic.name">
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#!" onclick="return false" class="card-footer-item" @click="submit">Comentar</a>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "modal-topic-form",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      topic: {
        name: ""
      }
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.topic);
    }
  }
};
</script>

<style>
</style>
