<template>
  <div>
    <b-dropdown hoverable aria-role="list">
      <b-button size="is-large" class="button is-primary" slot="trigger">
        <span>Anos</span>
        <b-icon icon="menu-down"></b-icon>
      </b-button>
      <b-dropdown-item aria-role="listitem" @click="selectYear(0)">Todos</b-dropdown-item>
      <b-dropdown-item separator></b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(1)">1 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(2)">2 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(3)">3 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(4)" disabled>4 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(5)" disabled>5 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(6)" disabled>6 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(7)" disabled>7 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(8)" disabled>8 EF</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(9)" disabled>9 EF</b-dropdown-item>
      <b-dropdown-item separator></b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(10)" disabled>1 EM</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(11)" disabled>2 EM</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="selectYear(12)" disabled>3 EM</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedYear: 0
    };
  },
  methods: {
    selectYear(year) {
      this.selectedYear = year;
      this.$emit("selectYear", this.selectedYear);
    }
  }
};
</script>

<style>
</style>
