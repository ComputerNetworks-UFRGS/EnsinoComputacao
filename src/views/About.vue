<template>
  <section class="container pd">
    Sobre...
    <hr />
    <dependency-highlight></dependency-highlight>
    <hr />
  </section>
</template>
<script>
import DependencyHighlight from "@/components/DependencyHighlight";

export default {
  components: {
    DependencyHighlight
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
