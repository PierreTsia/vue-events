<template>
  <button
    type="button"
    @click="$emit('onClick', !isOpen)"
    class="text-gray-500 focus:text-white focus:outline-none hover:text-white focus:text-white block"
  >
    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
      <path
        v-if="isOpen"
        fill-rule="evenodd"
        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
      />
      <path
        v-else
        fill-rule="evenodd"
        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
      />
    </svg>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const Burger = defineComponent({
  name: "BurgerBtn",
  props: ["isOpen"]
});
export default Burger;
</script>
