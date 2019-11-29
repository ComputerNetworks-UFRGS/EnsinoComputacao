import Vue from "vue";
import App from "./App.vue";
import router from "./router/app";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import AuthDirective from "@/directives/auth";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleRight, faUpload, faTimes, faPrint, faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown)
library.add(faAngleRight)
library.add(faUpload)
library.add(faTimes)
library.add(faPrint)
library.add(faArrowLeft)
library.add(faFilter)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false;
Vue.directive("auth", AuthDirective);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
