import { ActionTree, GetterTree, MutationTree } from "vuex";
import { User } from "@/models/users.model";
import { RootState } from "@/store";
import { MutationTypes } from "@/store/mutation-types";
import axios from "axios";
import { BASE_URL } from "@/constants";
import router from "@/router/index";
import { WHO_AM_I } from "@/api";
import { apolloClient } from "@/main";

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

type SignupPayload = {
  username: string;
  email: string;
  password: string;
  handle: string;
};

const getters: GetterTree<AuthState, RootState> = {
  isAuth: ({ currentUser }) => !!currentUser,
  me: ({ currentUser }): User | null => currentUser,
  errorMessage: ({ error }) => error,
  authIsLoading: ({ isLoading }) => isLoading
};

const actions: ActionTree<AuthState, RootState> = {
  signup: async ({ commit }, payload: SignupPayload) => {
    commit(MutationTypes.SET_AUTH_ERROR, null);
    commit(MutationTypes.SET_AUTH_LOADING, true);
    localStorage.setItem("token", "");
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signup`, payload);

      localStorage.setItem("token", data?.access_token);
      commit(MutationTypes.SET_CURRENT_USER, data?.user);
      await router.push("/");
    } catch (e) {
      commit(
        MutationTypes.SET_AUTH_ERROR,
        e?.response?.data?.errorMessage ?? "Error signing up"
      );
    }
    commit(MutationTypes.SET_AUTH_LOADING, false);
  },

  login: async (
    { commit },
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
      commit(MutationTypes.SET_CURRENT_USER, data?.user);
      await router.push("/");
    } catch (e) {
      commit(
        MutationTypes.SET_AUTH_ERROR,
        e?.response?.data?.errorMessage ?? "Error login in"
      );
    }
    commit(MutationTypes.SET_AUTH_LOADING, false);
  },
  logout: async ({ commit }) => {
    commit(MutationTypes.SET_AUTH_LOADING, true);
    localStorage.setItem("token", "");
    commit(MutationTypes.SET_CURRENT_USER, null);
    commit(MutationTypes.SET_AUTH_LOADING, false);
    await router.push("/login");
  },
  getCurrentUser: async ({ commit }) => {
    commit(MutationTypes.SET_AUTH_LOADING, true);

    try {
      const { data } = await apolloClient.query({ query: WHO_AM_I });
      commit(MutationTypes.SET_CURRENT_USER, data.whoAmI);
    } catch (e) {
      commit(
        MutationTypes.SET_AUTH_ERROR,
        e?.response?.data?.errorMessage ?? "Error retrieving current user"
      );
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
