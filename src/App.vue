<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <router-view/>
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
      this.$store.commit("set_user", res.data);
    });
  }
};
</script>
<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#app main {
  flex-grow: 1;
  margin: 30px 0px;
}
</style>
