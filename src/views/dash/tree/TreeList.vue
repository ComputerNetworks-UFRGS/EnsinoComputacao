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
        <tree-item class="item" :item="topics" @add-item="addItem" @attach-skill="attachSkill"></tree-item>

        <hr>
        <!-- <pre>
          {{ topics }}
        </pre>-->
      </div>
    </div>
  </div>
</template>

<script>
import Topics from "@/services/topic";
import TreeItem from "@/components/TreeItem";

export default {
  components: {
    TreeItem
  },
  data() {
    return {
      learningStage: 4,
      topics: []
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
    // makeFolder: function(item) {
    //   this.$set(item, "items", []);
    //   this.addItem(item);
    // },
    addItem: function(item) {
      console.log("addItem", item);
      item.items.push({
        title: "new stuff",
        items: []
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
