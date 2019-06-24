import Vue from "vue";
import App from "./App.vue";
//import BootstrapVue from "bootstrap-vue";
//import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import AuthDirective from "@/directives/auth";

Vue.use(Buefy);
//Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.directive("auth", AuthDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
