<template>
  <div class="profile-page">
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex"></div>
      </section>
      <!-- 1st Hero Variation -->
    </div>

    <section class="section section-skew">
      <div class="section section-lg pt-lg-0">
        <GojsTest class="graphContainer" :yearsMode="yearsMode"></GojsTest>
      </div>
    </section>
  </div>
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
