<template>
  <b-modal :active="isOpen" @close="$emit('update:show', false)" class="modal-review">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">{{ title }}</div>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="mb-4">
            <textarea
              v-model="comment"
              class="form-control form-control-alternative"
              name="name"
              rows="12"
              cols="20"
              placeholder="Escreva aqui seu comentário..."
            ></textarea>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#!" class="card-footer-item" @click="makeComment">Comentar</a>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "modal-comment",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Nota de revisão"
    }
  },
  data() {
    return {
      comment: ""
    };
  },
  computed: {
    isOpen() {
      return this.show;
    }
  },
  methods: {
    makeComment() {
      this.$emit("comment", this.comment);
    }
  }
};
</script>

<style lang="scss">
.modal-review {
  .animation-content  {
    max-width: 400px!important;
  }
  textarea {
    width: 100%;
  }
  
}
</style>
