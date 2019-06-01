<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <GojsTest></GojsTest>
      </div>
    </section>
  </div>
</template>
<script>
import GojsTest from "@/components/GojsTest.vue";
export default {
  components: {
    GojsTest
  }
};
</script>
<style>
</style>
