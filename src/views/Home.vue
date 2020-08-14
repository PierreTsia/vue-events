<template>
  <div class="home">
    <div class="container mx-auto py-3 mb-3 h-24">
      <event-menu
        :active-menu-id="activeMenuItemId"
        @onMenuClick="handleMenuClick"
      />
    </div>

    <div
      class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto mt-2"
    >
      <div
        v-for="event in displayedEvents"
        :key="event.id"
        class="p-3 flex justify-center align-middle"
      >
        <base-event-card :event="event" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted
} from "@vue/composition-api";
import { BaseEventCard } from "@/components/base";
import EventMenu from "@/components/EventMenu.vue";
import { MenuItem, Period, useEventMenu } from "@/hooks/useEventMenu";
import { useDate } from "@/hooks/useDate";
import { Event } from "@/models/events.model";

const Home = defineComponent({
  name: "Home",
  components: { BaseEventCard, EventMenu },
  setup(_, { root: { $store } }) {
    const { activeMenuItemId, setActiveItem } = useEventMenu();
    const { dateIsToday, dateIsThisWeek, dateIsThisMonth } = useDate();

    const handleMenuClick = (menuItem: MenuItem) => setActiveItem(menuItem);

    const isActivePeriod = (event: Event): boolean => {
      switch (activeMenuItemId.value) {
        case Period.All:
          return true;
        case Period.Today:
          return dateIsToday(event.startDate);
        case Period.CurrentWeek:
          return dateIsThisWeek(event.startDate);
        case Period.CurrentMonth:
          return dateIsThisMonth(event.startDate);
      }
    };

    const displayedEvents: ComputedRef<Event[]> = computed(() =>
      $store.getters.allEvents.filter(isActivePeriod)
    );

    onMounted(async () => {
      await $store.dispatch("fetchEvents");
    });

    return { activeMenuItemId, handleMenuClick, displayedEvents };
  }
});

export default Home;
</script>
