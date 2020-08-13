<template>
  <div class="home">
    <h1 class="p-3 text-gray-800">{{ $store.getters.me }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";

const Home = defineComponent({
  name: "Home",
  components: {},
  setup(_, { root: { $store } }) {
    onMounted(async () => {
      await $store.dispatch("fetchEvents");
    });
  }
});

export default Home;
</script>
