<template>
  <button
    class="rounded-full bg-gray-300 p-2 hover:bg-gray-400 mr-2 focus:outline-none"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const BaseFab = defineComponent({
  name: "BaseFab"
});
export default BaseFab;
</script>
