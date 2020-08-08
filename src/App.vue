<template>
  <div id="app">
    <navbar v-if="$store.getters.isAuth" />
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/navbar/Navbar.vue";
const App = defineComponent({
  name: "App",
  components: { Navbar }
});
export default App;
</script>
