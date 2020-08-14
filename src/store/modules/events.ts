import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/mutation-types";
import { Event } from "@/models/events.model";
import { User } from "@/models/users.model";

import { GET_EVENTS } from "@/api";
import { apolloClient } from "@/main";
export type EventState = {
  events: Event[];
  isLoading: boolean;
  error: string | null;
};

const state: EventState = {
  events: [],
  isLoading: false,
  error: null
};

const getters: GetterTree<EventState, RootState> = {
  allEvents: ({ events }) => events,
  myEvents: ({ events }, { me }: { me: User | null }) =>
    events.filter(e => e.creator.id === me?.id)
};

const actions: ActionTree<EventState, RootState> = {
  fetchEvents: async ({ commit }) => {
    commit(MutationTypes.SET_EVENT_LOADING, true);

    try {
      const { data, errors } = await apolloClient.query({ query: GET_EVENTS });
      commit(MutationTypes.SET_EVENTS, data.events);
      if (errors) {
        commit(MutationTypes.SET_EVENT_ERROR, errors);
      }
    } catch (e) {
      commit(MutationTypes.SET_EVENT_ERROR, e);
    }

    commit(MutationTypes.SET_EVENT_LOADING, false);
  }
};

const mutations: MutationTree<EventState> = {
  [MutationTypes.SET_EVENT_LOADING]: (state, loadingState) => {
    state.isLoading = loadingState;
  },
  [MutationTypes.SET_EVENTS]: (state, events) => {
    state.events = events;
  },
  [MutationTypes.SET_EVENT_ERROR]: (state, error) => {
    state.error = error;
  }
};

export default { state, actions, getters, mutations };
