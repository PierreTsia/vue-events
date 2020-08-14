import { reactive, toRefs } from "@vue/composition-api";
export enum Period {
  All = "all",
  Today = "today",
  CurrentWeek = "currentWeek",
  CurrentMonth = "currentMonth"
}

export type MenuItem = { label: string; id: Period };

export type EventMenuState = {
  activeMenuItemId: Period;
  menuItems: MenuItem[];
};

export const useEventMenu = () => {
  const state: EventMenuState = reactive({
    activeMenuItemId: Period.All,
    menuItems: [
      { label: "All", id: Period.All },
      { label: "Today", id: Period.Today },
      { label: "This week", id: Period.CurrentWeek },
      { label: "This month", id: Period.CurrentMonth }
    ]
  });

  const setActiveItem = (item: MenuItem) => (state.activeMenuItemId = item.id);

  return { ...toRefs(state), setActiveItem };
};
