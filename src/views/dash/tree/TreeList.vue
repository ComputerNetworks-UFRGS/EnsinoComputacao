<template>
  <div>
    <br>
    <!-- <router-link
      v-auth="'role.create'"
      to="/dash/papeis/criar"
      class="button is-success is-pulled-right"
    >Fases de ensino</router-link>-->

    <h4 class="title is-4">Organização de tópicos de ensino</h4>

    <div class="card">
      <div class="card-content">
        <tree-item
          class="item"
          :item="topics"
          @add-item="openTopicFormModal"
          @attach-skill="attachSkill"
        ></tree-item>

        <hr>
        <!-- <pre>
          {{ topics }}
        </pre>-->
      </div>
    </div>

    <modal-topic-form :show.sync="isOpenTopicFormModal" @submit="addItem($event)"></modal-topic-form>
  </div>
</template>

<script>
import Topics from "@/services/topic";
import TreeItem from "@/components/TreeItem";
import ModalTopicForm from "@/components/ModalTopicForm";

export default {
  components: {
    TreeItem,
    ModalTopicForm
  },
  data() {
    return {
      learningStage: 4,
      topics: [],
      isOpenTopicFormModal: false,
      openTopic: false
    };
  },
  created() {
    this.fetchTopics();
  },
  methods: {
    fetchTopics() {
      Topics.list()
        .then(res => res.data)
        .then(topics => {
          console.log("...", topics);
          this.topics = topics;
        });
    },
    openTopicFormModal(parent) {
      console.log('parent', parent)
      this.isOpenTopicFormModal = true;
      this.openTopic = parent;
    },
    addItem: function(item) {

      let items = this.openTopic.items
      let type_id = items[0] ? items[0].type : null

      let topic = {
        type_id: type_id,
        parent_id: this.openTopic.id,
        name: item.name
      };

      console.log('topic', topic)

      Topics.create(topic)
        .then(res => {
          this.openTopic.items.push({
            title: item.name,
            items: []
          });
        })
        .finally(() => {
          this.isOpenTopicFormModal = false;
        });
    },
    attachSkill: function(item) {
      console.log("attachSkill", item);
    }
  }
};
</script>

<style scoped>
</style>
