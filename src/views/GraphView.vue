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
                <div class="container shape-container d-flex">
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <br>
        <section class="section section-lg pt-lg-0">
          <graph :width="1600" :height="800"></graph>
        </section>

    </div>
</template>

<script>
import Graph from '@/components/Graph';
import json from "@/assets/data.json";

export default {
  components: {
    Graph
  }
}
</script>

