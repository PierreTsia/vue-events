<template>
  <div class="max-w-xs relative">
    <div class="bg-white shadow-2xl rounded-b-lg mb-6 tracking-wide">
      <div class="md:flex-shrink-0">
        <img
          src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
          alt="mountains"
          class="w-full h-32"
        />
      </div>
      <div class="flex -mt-4 flex justify-end pr-5 absolute right-0">
        <base-fab
          v-for="action in actions"
          :key="action.id"
          @onClick="handleActionClick(action.id)"
        >
          <component :is="`${action.icon}-icon`" />
        </base-fab>
      </div>
      <div class="px-4 pt-2 mt-4 pb-6">
        <h2 class="font-semibold text-sm text-red-800 tracking-tight mb-3">
          {{ toReadableFormat(event.startDate) }}
        </h2>
        <p class="text-md font-bold text-gray-800 leading-tight mr-1">
          {{ event.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import { useDate } from "@/hooks/useDate";
import BaseFab from "./BaseFab.vue";

enum ActionId {
  Like = "like",
  Share = "share"
}
type Action = {
  id: ActionId;
  icon: string;
};

const BaseEventCard = defineComponent({
  name: "BaseEventCard",
  components: { BaseFab },
  props: ["event"],
  setup() {
    const { toReadableFormat } = useDate();
    const actions: Action[] = reactive([
      { icon: "share", id: ActionId.Share },
      { icon: "heart-outline", id: ActionId.Like }
    ]);

    const handleActionClick = (actionId: ActionId) => {
      console.log(actionId);
    };
    return { actions, handleActionClick, toReadableFormat };
  }
});

export default BaseEventCard;
</script>

<style scoped></style>
