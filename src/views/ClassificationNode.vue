<template>
  <div class="media" v-on:click.stop.prevent="isOpen = !isOpen">
    <div class="media-left" v-if="node && node.items">
      <button class="button is-small is-light">
        <i class="fas" :class="isOpen ? 'fa-chevron-down' : 'fa-chevron-right'"></i>
      </button>
    </div>
    <div class="media-content">
      <span v-if="node.items">
        <h6>
          <b>{{ node.title }}</b>
        </h6>
        <span v-if="isOpen">
          <br>
          <ul v-for="item of node.items" :key="item.id" class="list-group">
            <classification-node
              @openTaskList="openTaskList"
              :node="item"
              :show-skill-count="showSkillCount"
              :open="false"
            ></classification-node>
          </ul>
        </span>
      </span>
      <span v-else>
        <div class="row skill">
          <div class="col-lg-2">
            <b>{{ node.code }}</b>
          </div>
          <div class="col-lg-10" @click="openTaskList(node)">{{ node.name }}</div>
        </div>
      </span>
    </div>
    <div class="media-right">
      <b-tag v-if="node && node.items && showSkillCount">
        {{ node.items.length }}
        <span v-if="node.items.length > 1">habilidades</span>
        <span v-else>habilidade</span>
      </b-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: "classification-node",
  props: {
    node: Object,
    open: Boolean,
    showSkillCount: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: this.open
    };
  },
  methods: {
    openTaskList(node) {
      this.$emit("openTaskList", node);
    }
  }
};
</script>

<style scoped>
.skill {
  text-align: justify;
  padding: 8px !important;
  font-size: 15px;
  line-height: 17px;
  cursor: pointer;
}
</style>
