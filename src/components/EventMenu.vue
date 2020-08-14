<template>
  <ul class="flex justify-center">
    <li
      class="font-extrabold uppercase"
      v-for="item in menuItems"
      :key="item.id"
    >
      <button
        :class="[
          {
            'border-b-2': activeMenuId === item.id,
            'border-b-indigo-800': activeMenuId === item.id
          },
          activeMenuId === item.id
            ? 'text-indigo-500 font-extrabold'
            : 'text-indigo-800 font-medium'
        ]"
        class="p-2 pb-1 hover:border-b-2 border-indigo-800 font  hover:text-indigo-500 mx-3 text-sm text-center focus:outline-none"
        @click="$emit('onMenuClick', item)"
      >
        {{ item.label }}
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useEventMenu } from "@/hooks/useEventMenu";

const EventMenu = defineComponent({
  name: "EventMenu",
  props: ["activeMenuId"],
  setup() {
    const { menuItems } = useEventMenu();

    return { menuItems };
  }
});

export default EventMenu;
</script>
