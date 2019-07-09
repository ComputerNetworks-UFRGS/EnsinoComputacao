<template>
  <b-modal :active="isOpen" @close="$emit('update:show', false)">
    <div class="card modal-select-topic">
      <!-- <header class="card-header">
        <div class="card-header-title">Selecionar tópico</div>
      </header>-->
      <div class="card-content">
        <div class="content">
          <div class="mb-4">
            <b-field label="Selecionar tópico">
              <b-autocomplete
                rounded
                v-model="filter"
                :data="filteredTopics"
                placeholder="Selecionar tópico"
                field="name"
                icon="magnify"
                @select="option => selected = option"
              >
                <template slot="empty">Tópico não encotrado.</template>
              </b-autocomplete>
            </b-field>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#!" class="card-footer-item" @click="selectTopic">Selecionar</a>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import Objects from "@/services/object";
import _ from "lodash";

export default {
  name: "modal-select-topic",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      topics: [],
      selected: undefined,
      filter: ""
    };
  },
  created() {
    Objects.list()
      .then(res => res.data)
      .then(topics => {
        this.topics = topics;
      });
  },
  computed: {
    isOpen() {
      return this.show;
    },
    filteredTopics() {
      return _.filter(this.topics, t => {
        return (
          t.name
            .toString()
            .toLowerCase()
            .indexOf(this.filter.toLowerCase()) >= 0
        );
      });
    }
  },
  methods: {
    selectTopic() {
      this.$emit("selected", this.selected);
      this.selected = undefined;
    }
  }
};
</script>