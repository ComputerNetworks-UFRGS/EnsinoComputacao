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

      <div class="add">
        <button
          v-if="!item.is_leaf"
          class="button is-white is-small"
          @click.stop="$emit('add-item', {
        item: item,
        depth: depth,
      })"
        >Novo filho</button>
        <button
          class="button is-white is-small"
          @click.stop="$emit('delete-item', item)"
        >Remover</button>
      </div>
    </div>

    <div class="list-items" v-show="isOpen" v-if="isFolder">
      <span v-if="hasChildren(item)">
        <tree-item
          class="item"
          v-for="(child, index) in item.items"
          :key="index"
          :item="child"
          @add-item="$emit('add-item', $event)"
          @delete-item="$emit('delete-item', $event)"
          :depth="depth + 1"
        ></tree-item>
      </span>
      <!-- <span> -->
      <!-- <small>Nenhum tópico filho.</small> -->
      <!-- </span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "tree-item",
  props: {
    item: Object,
    depth: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  created() {
    this.isOpen = !this.item.is_leaf;
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    hasChildren(item) {
      // return true
      return item.items && item.items.length > 0 && item.items[0].id !== null;
    }
  },
  computed: {
    isFolder: function() {
      return this.item.items && this.item.items.length;
    }
  }
};
</script>

<style scoped lang="scss">
.item {
  // cursor: pointer;
  min-height: 27px;
  .item {
    padding-left: 1em;
  }
}
.bold {
  font-weight: bold;
}
.add {
  // float: right;
  display: inline-block;
  // vertical-align: top;
  // margin-bottom: 20px;
}
.list-items {
  min-height: 10px;
}
</style>
