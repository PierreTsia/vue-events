<template>
  <form
    class="block bg-white sm:w-1/2 sm:mx-auto xl:w-1/3 mt-20 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
  >
    <div
      v-for="(field, index) in signupFields"
      :key="index"
      :class="[
        `${index === signupFields.length - 1 ? 'mb-8' : 'mb-4'}`,
        'block'
      ]"
    >
      <base-input
        :field="field"
        @onInput="handleInputChange"
        :rule="signupRules[field.name]"
      />
    </div>
    <div class="flex items-center justify-between">
      <base-button
        @onClick="handleSignup"
        text="Sign Up"
        :is-loading="$store.getters.authIsLoading"
        :is-disabled="!signupFormIsValid"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/composition-api";
import { useAuth } from "@/components/auth/useAuth";
import { BaseInput, BaseButton } from "@/components/base/index";

import { SignupState } from "@/components/auth/useAuth";

type InputPayload = {
  type: "username" | "email" | "handle" | "password" | "confirmPassword";
  value: string;
};

const SignUpForm = defineComponent({
  name: "sign-up-form",
  components: { BaseInput, BaseButton },
  setup(_, { root: { $store } }) {
    const state: SignupState = reactive({
      username: "",
      email: "",
      handle: "",
      password: "",
      confirmPassword: ""
    });

    const { signupFields, signupRules, signupFormIsValid } = useAuth(state);
    const handleInputChange = ({ type, value }: InputPayload) =>
      (state[type] = value);

    const handleSignup = async () => {
      //eslint-disable-next-line
      const { confirmPassword, ...data } = state;
      await $store.dispatch("signup", data);
    };

    return {
      ...toRefs(state),
      signupFields,
      signupRules,
      signupFormIsValid,
      handleInputChange,
      handleSignup
    };
  }
});

export default SignUpForm;
</script>
