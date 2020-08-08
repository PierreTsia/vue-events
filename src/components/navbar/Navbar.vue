<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-800 mb-3"
  >
    <div
      class="px-4 mx-auto flex flex-wrap items-center justify-between min-w-full"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start"
      >
        <a
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
          href="#pablo"
        >
          Vue Events
        </a>
        <div class="flex justify-center align-middle">
          <div class="flex flex-wrap justify-start  justify-center lg:hidden">
            <base-dropdown :isShown="showDropdownMenu" class="mr-2 pt-1">
              <base-avatar
                :avatar="$store.getters.me.avatar"
                @click.native="toggleDropDown"
              />
            </base-dropdown>
          </div>

          <burger
            class="lg:hidden"
            :is-open="showMenu"
            @onClick="toggleNavbar"
          />
        </div>
      </div>
      <div
        :class="[showMenu ? 'flex' : 'hidden']"
        class="lg:flex lg:flex-grow items-center w-full lg:w-auto lg:justify-end"
      >
        <ul
          class="flex flex-col lg:flex-row list-none mr-auto w-full lg:w-auto lg:m-0 lg:items-end"
        >
          <nav-item v-for="link in navLinks" :key="link.name" :link="link" />
          <div
            class="hidden lg:flex lg:flex-wrap lg:justify-start px-4 lg:justify-center "
          >
            <base-dropdown :isShown="showDropdownMenu">
              <base-avatar
                :avatar="$store.getters.me.avatar"
                @click.native="toggleDropDown"
              />
            </base-dropdown>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "@vue/composition-api";
import Burger from "./Burger.vue";
import { BaseAvatar, BaseDropdown } from "@/components/base/index";
import NavItem from "./NavItem.vue";
const Navbar = defineComponent({
  name: "Navbar",
  components: { BaseAvatar, Burger, NavItem, BaseDropdown },
  setup() {
    const showMenu: Ref<boolean> = ref(false);
    const showDropdownMenu: Ref<boolean> = ref(false);
    const toggleNavbar = () => (showMenu.value = !showMenu.value);
    const toggleDropDown = () =>
      (showDropdownMenu.value = !showDropdownMenu.value);
    const navLinks = ref([
      { name: "Events" },
      { name: "Users" },
      { name: "Create" }
    ]);
    return {
      showMenu,
      showDropdownMenu,
      toggleNavbar,
      toggleDropDown,
      navLinks
    };
  }
});
export default Navbar;
</script>
