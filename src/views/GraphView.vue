<template>
  <section class="graph-page">
    <ModalTasks :show="tasksModal" @close="closeModal"></ModalTasks>
    <GojsTest @nodeClicked="openModal"></GojsTest>
  </section>
</template>

<script>
import GojsTest from "@/components/GojsTest";
import ModalTasks from "@/components/ModalTasks";
import json from "@/assets/data.json";

export default {
  components: {
    GojsTest,
    ModalTasks
  },
  data() {
    return {
      tasksModal: false
    };
  },
  methods: {
    openModal(id) {
      this.tasksModal = true;
      console.log(id);
    },
    closeModal() {
      this.tasksModal = false;
    }
  }
};
</script>

