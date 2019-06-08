<template>
  <section class="about-page">
    <GojsTest class="graphContainer" :yearsMode="yearsMode"></GojsTest>
  </section>
</template>
<script>
import GojsTest from "@/components/GojsTest.vue";
export default {
  components: {
    GojsTest
  },
  data() {
    return {
      yearsMode: false
    };
  }
};
</script>
<style>
.graphContainer {
  display: block;
  margin: 0 auto;
}
</style>
