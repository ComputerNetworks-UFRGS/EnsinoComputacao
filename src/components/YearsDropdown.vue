<template>
  <div>
    <b-dropdown split size="lg" @click="selectYear(0)" id="dropdown-1" text="Anos" class="m-2">
      <b-dropdown-item>1 EF</b-dropdown-item>
      <b-dropdown-item>2 EF</b-dropdown-item>
      <b-dropdown-item>3 EF</b-dropdown-item>
      <b-dropdown-item disabled>4 EF</b-dropdown-item>
      <b-dropdown-item disabled>5 EF</b-dropdown-item>
      <b-dropdown-item disabled>6 EF</b-dropdown-item>
      <b-dropdown-item disabled>7 EF</b-dropdown-item>
      <b-dropdown-item disabled>8 EF</b-dropdown-item>
      <b-dropdown-item disabled>9 EF</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item disabled>1 EM</b-dropdown-item>
      <b-dropdown-item disabled>2 EM</b-dropdown-item>
      <b-dropdown-item disabled>3 EM</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    selectYear(year) {
      this.$emit("selectYear", year);
    }
  }
};
</script>

<style>
</style>
