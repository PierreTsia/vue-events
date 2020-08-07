<template>
  <form
    class="block bg-white sm:w-1/2 sm:mx-auto xl:w-1/3 mt-20 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
  >
    <error-alert
      v-if="$store.getters.errorMessage"
      :text="$store.getters.errorMessage"
      @onClearError="clearAuthError"
    />
    <div
      v-for="(field, index) in loginFields"
      :key="index"
      :class="[
        `${index === loginFields.length - 1 ? 'mb-8' : 'mb-4'}`,
        'block'
      ]"
    >
      <base-input
        :field="field"
        @onInput="handleInputChange"
        :rule="loginRules[field.name]"
      />
    </div>
    <div class="flex items-center justify-between">
      <base-button
        @onClick="handleLogin"
        text="Log In"
        :is-loading="$store.getters.authIsLoading"
        :is-disabled="!loginFormIsValid"
      />
      <a
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >
        Forgot Password?
      </a>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import ErrorAlert from "@/components/auth/ErrorAlert.vue";
import { BaseInput, BaseButton } from "@/components/base/index";
import { MutationTypes } from "@/store/mutation-types";
import { useAuth, LoginState } from "@/components/auth/useAuth";

type InputPayload = {
  type: "email" | "password";
  value: string;
};

const LoginForm = defineComponent({
  name: "login-form",
  components: { BaseInput, BaseButton, ErrorAlert },
  setup(props, { root: { $store } }) {
    const state: LoginState = reactive({
      email: "",
      password: ""
    });

    const { loginFields, loginFormIsValid, loginRules } = useAuth(state);

    const handleLogin = async () => {
      await $store.dispatch("login", state);
    };
    const handleInputChange = ({ type, value }: InputPayload) =>
      (state[type] = value);

    const clearAuthError = () => {
      $store.commit(MutationTypes.SET_AUTH_ERROR, null);
    };

    return {
      ...toRefs(state),
      loginRules,
      loginFields,
      loginFormIsValid,
      clearAuthError,
      handleLogin,
      handleInputChange
    };
  }
});
export default LoginForm;
</script>
