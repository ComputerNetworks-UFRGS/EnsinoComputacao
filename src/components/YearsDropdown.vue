<template>
  <div>
    <b-dropdown aria-role="list" @click="selectYear(0)">
      <button class="button is-primary" slot="trigger">
        <span>Ano</span>
        <b-icon icon="menu-down"></b-icon>
      </button>
      <b-dropdown-item aria-role="listitem">1 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem">2 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem">3 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>4 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>5 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>6 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>7 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>8 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>9 EF</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item aria-role="listitem" disabled>1 EM</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>2 EM</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" disabled>3 EM</b-dropdown-item>
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
