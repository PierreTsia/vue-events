<template>
  <li class="nav-item hover:bg-indigo-600 rounded-lg lg:hover:bg-indigo-800">
    <a
      class="px-3 py-2 flex items-center  text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
      href="#pablo"
    >
      <span class="ml-2">{{ link.name }}</span>
    </a>
  </li></template
>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const NavItem = defineComponent({ name: "NavItem", props: ["link"] });

export default NavItem;
</script>
