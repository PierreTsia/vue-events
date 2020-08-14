import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueCompositionAPI from "@vue/composition-api";
import ApolloClient from "apollo-boost";
import { BASE_URL } from "@/constants";
import VueApollo from "vue-apollo";
import { setAuth, formatErrors } from "@/helpers/apollo.helpers";

import "./assets/styles/index.css";

import MenuIcon from "vue-material-design-icons/Menu.vue";
import ShareVariantOutline from "vue-material-design-icons/ShareVariantOutline.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";

Vue.component("menu-icon", MenuIcon);
Vue.component("share-icon", ShareVariantOutline);
Vue.component("heart-outline-icon", HeartOutline);

Vue.use(VueCompositionAPI);
Vue.use(VueApollo);

Vue.config.productionTip = false;

export const apolloClient = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => setAuth(operation),
  onError: ({ graphQLErrors, networkError }) =>
    formatErrors({ graphQLErrors, networkError })
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
