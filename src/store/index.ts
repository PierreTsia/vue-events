import Vue from "vue";
import Vuex, { Store } from "vuex";
import auth from "./modules/auth";
import events from "./modules/events";
import { AuthState } from "./modules/auth";
import { EventState } from "./modules/events";

export interface RootState {
  auth: AuthState;
  events: EventState;
}

Vue.use(Vuex);

const store: Store<RootState> = new Vuex.Store({
  modules: {
    auth,
    events
  }
});

export default store;
