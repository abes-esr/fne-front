import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BaseLogo from "@/components/base-components/BaseLogo.vue";
import LoadingPage from "@/components/base-components/LoadingPage.vue";

Vue.config.productionTip = false;
Vue.component("base-logo", BaseLogo);
Vue.component("loading-page", LoadingPage);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
