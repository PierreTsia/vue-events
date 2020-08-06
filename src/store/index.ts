import Vue from "vue";
import Vuex, { Store } from "vuex";
import auth from "./modules/auth";
import { AuthState } from "./modules/auth";

export interface RootState {
  auth: AuthState;
}

Vue.use(Vuex);

const store: Store<RootState> = new Vuex.Store({
  modules: {
    auth
  }
});

export default store;
