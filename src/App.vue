<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <router-view />
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
// import { FadeTransition } from "vue2-transitions";
import UserService from "@/services/user";

export default {
  // components: {
  // FadeTransition
  // },
  created() {
    UserService.detail().then(res => {
      console.log("set_user: App.vue");
      this.$store.commit("set_user", res.data);
    });
  }
};
</script>
<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #eeeeee;
}
#app main {
  flex-grow: 1;
  .pd {
    padding: 12px;
  }
}
// Bulma customization
@import "@/assets/custom.scss";
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
