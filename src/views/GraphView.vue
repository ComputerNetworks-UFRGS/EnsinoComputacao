<template>
  <div>
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
    <br>
    <section class="section section-lg pt-lg-0">
      <GojsTest></GojsTest>
    </section>
  </div>
</template>

<script>
import GojsTest from "@/components/GojsTest";
import json from "@/assets/data.json";

export default {
  components: {
    GojsTest
  },
  data() {
    return {};
  }
};
</script>

