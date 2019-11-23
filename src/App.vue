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
import UserService from '@/services/user'
export default {
  beforeMount() {
    let token = localStorage.getItem("token");
    if (token) {
      UserService.detail(token).then(res => {
        this.$store.commit("set_user", res.data);
      });
    }
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
@import "@/assets/fresh/core.scss";
</style>
