<template>
  <div>
    <div @click="toggle">
      <span v-if="isFolder">
        <span class="icon">
          <i
            class="fas"
            :class="{
          'fa-angle-down': isOpen,
          'fa-angle-right': !isOpen,
        }"
          ></i>
        </span>
        {{ item.title }}
      </span>
      <span v-else>
        <span class="icon" style="font-size: 8px">
          <i class="fas fa-circle"></i>
        </span>
        <small>{{ item.title }}</small>
      </span>
    </div>
    <div v-show="isOpen" v-if="isFolder">
      <tree-item
        class="item"
        v-for="(child, index) in item.items"
        :key="index"
        :item="child"
        @add-item="$emit('add-item', $event)"
        @attach-skill="$emit('attach-skill', $event)"
      ></tree-item>

      <div class="add item" @click="$emit(item.is_leaf ? 'attach-skill' : 'add-item', item)">
        <button class="button is-small is-light">
            <span v-if="item.is_leaf">Anexar habilidade</span>
            <span v-else>Novo tópico</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tree-item",
  props: {
    item: Object
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  created() {
      this.isOpen = !this.item.is_leaf
  },
  computed: {
    isFolder: function() {
      return this.item.items && this.item.items.length
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    }
    // makeFolder: function() {
    //   if (!this.isFolder) {
    //     this.$emit("make-folder", this.item);
    //     this.isOpen = true;
    //   }
    // }
  }
};
</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
  .item {
    padding-left: 1em;
  }
}
.bold {
  font-weight: bold;
}
.add {
    margin-bottom: 20px;
}
</style>
