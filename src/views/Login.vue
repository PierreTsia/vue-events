<template>
  <div
    class="min-h-screen min-w-full p-4 bg-gray-200 min-h-screen block relative"
  >
    <h1 class="text-3xl text-gray-800 text-center mt-20 font-extrabold">
      {{ title }}
    </h1>
    <h2 class="text-lg text-gray-600 text-center mb-20 ">
      {{ question }}
      <span
        class="font-semibold text-blue-500 underline cursor-pointer"
        @click="toggleForm"
        >{{ toggleText }}</span
      >
    </h2>
    <component :is="activeFormComponent" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, Ref } from "@vue/composition-api";
import LoginForm from "@/components/auth/LoginForm.vue";
import SignUpForm from "@/components/auth/SignUpForm.vue";
enum AuthForm {
  SignUp = "sign-up",
  Login = "login"
}

const Login = defineComponent({
  name: "Login",
  components: { LoginForm, SignUpForm },
  setup() {
    const activeForm: Ref<AuthForm> = ref(AuthForm.Login);

    const activeFormComponent = computed(() => `${activeForm.value}-form`);

    const title = computed(() =>
      activeForm.value === AuthForm.Login ? "Sign In" : "Sign up"
    );

    const question = computed(() =>
      activeForm.value === AuthForm.Login
        ? "Don't have an account yet ?"
        : "Already have an account ?"
    );
    const toggleText = computed(() =>
      activeForm.value === AuthForm.Login ? "Sign up" : "Sign in"
    );

    const toggleForm = () => {
      activeForm.value =
        activeForm.value === AuthForm.Login ? AuthForm.SignUp : AuthForm.Login;
    };

    return { activeFormComponent, title, question, toggleText, toggleForm };
  }
});

export default Login;
</script>
