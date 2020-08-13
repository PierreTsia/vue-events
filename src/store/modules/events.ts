import { ActionTree, GetterTree, MutationTree } from "vuex";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/mutation-types";

import { GET_EVENTS } from "@/api";
import { apolloClient } from "@/main";
export type EventState = {
  events: any;
  isLoading: boolean;
  error: string | null;
};

const state: EventState = {
  events: [],
  isLoading: false,
  error: null
};

const getters: GetterTree<EventState, RootState> = {
  allEvent: ({ events }) => events
};

const actions: ActionTree<EventState, RootState> = {
  fetchEvents: async ({ commit }) => {
    const { data } = await apolloClient.query({ query: GET_EVENTS });
    console.log(data);
  }
};

const mutations: MutationTree<EventState> = {};

export default { state, actions, getters, mutations };
