import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueCompositionAPI from "@vue/composition-api";
import ApolloClient from "apollo-boost";
import { BASE_URL } from "@/constants";
import VueApollo from "vue-apollo";
import { MutationTypes } from "@/store/mutation-types";

import "./assets/styles/index.css";

Vue.use(VueCompositionAPI);
Vue.use(VueApollo);

Vue.config.productionTip = false;

export const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: `${BASE_URL}/graphql`,
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // auth headers
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log("[NETWORK ERROR]", networkError);
    }
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.dir(err);
        if (err.name === "AuthenticationError") {
          console.warn(err);
          store.commit(MutationTypes.SET_AUTH_ERROR, err);
          store.dispatch("logout");
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

console.log(apolloProvider);

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
