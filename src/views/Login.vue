<template>
  <div
    class="min-h-screen min-w-full p-4 bg-gray-200 min-h-screen block relative"
  >
    <h1 class="text-3xl text-gray-800 text-center mt-20 font-extrabold">
      Sign In
    </h1>
    <h2 class="text-lg text-gray-600 text-center mb-20 ">
      Don't have an account yet ?
      <span class="font-semibold text-blue-500 underline cursor-pointer"
        >Sign-up</span
      >
    </h2>
    <login-form />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import LoginForm from "@/components/auth/LoginForm.vue";

const Login = defineComponent({
  name: "Login",
  components: { LoginForm }
});

export default Login;
</script>