<template>
  <div class="baseInput">
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="field.name">
      {{ field.label }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="[hasError ? 'border-red-600' : 'border-green-600']"
      :id="field.name"
      :type="field.type"
      :placeholder="field.placeholder"
      @input="e => handleInputChange(e.target.value)"
    />
    <p v-if="hasError" class="text-red-500 text-xs italic">{{ rule }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { Field } from "@/components/auth/useAuth";

type BaseInputProps = {
  field: Field;
  rule: boolean | string;
};

const BaseInput = defineComponent({
  name: "base-input",
  props: ["field", "rule"],
  setup(props: BaseInputProps, { emit }) {
    const handleInputChange = (input: string) =>
      emit("onInput", { type: props.field.name, value: input });

    const hasError = computed(() => typeof props?.rule === "string");

    return { handleInputChange, hasError };
  }
});

export default BaseInput;
</script>

<style scoped></style>
