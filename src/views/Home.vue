<template>
  <div class="home">
    <h1 class="p-3 text-gray-400">Test</h1>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { defineComponent } from "@vue/composition-api";

const Home = defineComponent({
  name: "Home",
  components: { HelloWorld }
});

export default Home;
</script>
