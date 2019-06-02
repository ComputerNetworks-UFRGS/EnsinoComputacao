<template>
  <div>
    <div v-if="reviews && reviews.length > 0">
      <hr>
      <b>{{ title }}</b>
      <div v-for="review of reviews" :key="review.id">
        <b>{{ review.user.name }}</b>
        <small>em {{ review.created_at | dateFormat }}:</small>
        {{ review.comment }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "review-list",
  props: {
    title: {
      type: String,
      default: "Revisões"
    },
    reviews: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  filters: {
    dateFormat: function(val) {
      moment.locale("pt_br");
      let parsed = moment(val);
      return parsed.format("L") + " as " + parsed.format("LT");
    }
  }
};
</script>

<style>
</style>
