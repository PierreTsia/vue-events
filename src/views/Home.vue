<template>
  <div class="home">
    <h1 class="p-3 text-gray-400">{{ $store.getters.me }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Home = defineComponent({
  name: "Home",
  components: {}
});

export default Home;
</script>
