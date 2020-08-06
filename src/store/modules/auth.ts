import { ActionTree, GetterTree, MutationTree } from "vuex";
import { User } from "@/models/users.model";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/mutation-types";
import axios from "axios";
import { BASE_URL } from "@/constants";

export type AuthState = {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
};

const state: AuthState = {
  currentUser: null,
  isLoading: false,
  error: null
};

const getters: GetterTree<AuthState, RootState> = {
  isAuth: ({ currentUser }) => !!currentUser,
  me: ({ currentUser }) => currentUser
};

const actions: ActionTree<AuthState, RootState> = {
  login: async (
    { commit, dispatch },
    { email, password }: { email: string; password: string }
  ) => {
    commit(MutationTypes.SET_AUTH_ERROR, null);
    commit(MutationTypes.SET_AUTH_LOADING, true);
    localStorage.setItem("token", "");
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
      });

      localStorage.setItem("token", data?.access_token);
      await dispatch("getCurrentUser");
    } catch (e) {
      commit(MutationTypes.SET_AUTH_ERROR, e);
      commit(MutationTypes.SET_AUTH_LOADING, false);
    }
  },
  getCurrentUser: async ({ commit }) => {
    commit(MutationTypes.SET_AUTH_LOADING, true);

    const token = localStorage.getItem("token");
    if (token?.length) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      try {
        const { data } = await axios.get(`${BASE_URL}/auth/me`, config);
        commit(MutationTypes.SET_CURRENT_USER, data);
      } catch (e) {
        console.log(e);
        commit(MutationTypes.SET_AUTH_ERROR, e);
      }
    }
    commit(MutationTypes.SET_AUTH_LOADING, false);
  }
};

const mutations: MutationTree<AuthState> = {
  [MutationTypes.SET_AUTH_LOADING]: (state, loadingState) => {
    state.isLoading = loadingState;
  },
  [MutationTypes.SET_CURRENT_USER]: (state, user) => {
    state.currentUser = user;
  },
  [MutationTypes.SET_AUTH_ERROR]: (state, error) => {
    state.error = error;
  }
};

export default { state, actions, getters, mutations };
