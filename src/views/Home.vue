<template>
  <div class="home">
    <h1 class="p-3 text-gray-400">{{ $store.getters.me }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";

const Home = defineComponent({
  name: "Home",
  components: {},
  setup(props, { root: { $store } }) {
   /* onMounted(async () => {
      await $store.dispatch("login", {
        email: "joe@mail.com",
        password: "Kuro55an"
      });
    });*/
  }
});

export default Home;
</script>
