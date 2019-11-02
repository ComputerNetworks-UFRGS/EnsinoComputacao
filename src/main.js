import Vue from "vue";
import App from "./App.vue";
import router from "./router/app";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import AuthDirective from "@/directives/auth";

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false;
Vue.directive("auth", AuthDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
