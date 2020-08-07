<template>
  <button
    class="bg-blue-500 block text-white font-bold py-2 px-4 rounded focus:outline-none "
    :class="[
      {
        'opacity-50': isDisabled || isLoading,
        'cursor-not-allowed': isDisabled || isLoading,
        'hover:bg-blue-700': !isDisabled && !isLoading,
        'focus:shadow-outline': !isDisabled && !isLoading
      }
    ]"
    type="button"
    @click="handleClick"
  >
    <div class="min-w-full min-h-48 w-24">
      <span v-if="isLoading" class="spinner mr-3" />
      <span v-else>{{ buttonText }}</span>
    </div>
  </button>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "@vue/composition-api";

type ButtonProps = {
  isLoading: boolean;
  isDisabled: boolean;
  text: string;
};

const BaseButton = defineComponent({
  name: "base-button",
  props: ["isDisabled", "isLoading", "text"],
  setup(props: ButtonProps, { emit }) {
    const buttonText: Ref<string> = ref(props?.text ?? "click");

    const handleClick = () => {
      if (props.isDisabled) return;
      emit("onClick");
    };

    return { buttonText, handleClick };
  }
});
export default BaseButton;
</script>
