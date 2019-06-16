<template>
  <div>
    <br>

    <h4 class="title is-4">Organização de tópicos de ensino</h4>

    <div class="card">
      <div class="card-content">
        <tree-item
          class="item"
          :item="topics"
          @add-item="openTopicFormModal"
          @delete-item="deleteItem"
        ></tree-item>
      </div>
    </div>

    <modal-topic-form :show.sync="isOpenTopicFormModal" @submit="addItem($event)"></modal-topic-form>
  </div>
</template>

<script>
import Topics from "@/services/topic"
import TreeItem from "@/components/TreeItem"
import ModalTopicForm from "@/components/ModalTopicForm"

export default {
  components: {
    TreeItem,
    ModalTopicForm
  },
  data() {
    return {
      learningStage: 4,
      topics: [],
      structure: [],
      isOpenTopicFormModal: false,
      openTopic: false,
      openTopicDepth: 0,
    };
  },
  created() {
    this.fetchTopics();
  },
  methods: {
    fetchTopics() {
      Topics.tree()
        .then(res => res.data)
        .then(data => {
          this.structure = data.structure
          this.topics = data.tree;
        });
    },
    openTopicFormModal(data) {
      this.isOpenTopicFormModal = true;
      this.openTopic = data.item;
      this.openTopicDepth = data.depth
    },
    addItem: function(item) {

      let items = this.openTopic.items
      let type_id = this.structure[this.openTopicDepth]
      let is_leaf = type_id == this.structure[this.structure.length - 1]

      let topic = {
        type_id: type_id,
        parent_id: this.openTopic.id,
        name: item.name
      };

      Topics.create(topic)
        .then(res => {
          if(this.openTopic.items[0].title == null) {
            this.openTopic.items = []
          }
          this.openTopic.items.push({
            title: item.name,
            is_leaf: is_leaf,
            items: []
          });
        })
        .finally(() => {
          this.isOpenTopicFormModal = false;
        });
    },
    deleteItem(item) {
      this.$dialog.confirm({
        message: "Confirma exclusão do tópico e de todos os seus subtópicos?",
        onConfirm: () => {
          Topics.delete(item.id).then(() => {
            this.fetchTopics();
          })
        }
      });
    },
  }
};
</script>

<style scoped>
</style>
