<template>
  <div class="w-8">
    <img
      :src="avatar"
      alt="avatar"
      class="shadow rounded-full max-w-full h-auto align-middle cursor-pointer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const BaseAvatar = defineComponent({ name: "BaseAvatar", props: ["avatar"] });
export default BaseAvatar;
</script>

<style scoped></style>
