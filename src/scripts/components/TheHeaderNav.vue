<template>
  <div @keyup.esc="isExpanded = undefined">
    <a href="#" class="relative hidden md:block h-full c-header-utility-options"
      >Apply</a
    >
    <a href="#" class="relative hidden md:block h-full c-header-utility-options"
      >Give</a
    >
    <a href="#" class="relative hidden md:block h-full c-header-utility-options"
      >Visit</a
    >

    <div class="relative hidden md:block">
      <button
        class="the-header__button flex items-center h-full text-16 leading-1 font-semibold text-black information-dropdown"
        :class="classList('resource')"
        :aria-expanded="isExpanded === 'resource'"
        @click="toggleExpanded('resource')"
      >
        {{ resourceTitle }}
        <svg
          class="w-4 mt-px ml-2.5"
          :class="{ 'transform rotate-180': isExpanded === 'resource' }"
          aria-hidden="true"
          viewBox="0 0 18 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9846 0.999999L9.0969 9L1.1499 1"
            stroke="currentColor"
            stroke-width="2"
            stroke-miterlimit="10"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </button>
      <transition-fade mode="in">
        <div
          v-show="isExpanded === 'resource'"
          class="absolute top-full right-0 w-96 max-h-content overflow-y-auto c-header-utility-dropdown background-white"
        >
          <slot name="resource" />
        </div>
      </transition-fade>
    </div>

    <button
      class="the-header__button md:flex items-center h-full py-4 px-5 lg:px-6 text-16 leading-1 font-semibold c-search-trigger"
      :class="classList('search')"
      :aria-expanded="isExpanded === 'search'"
      @click="toggleExpanded('search')"
    >
      <span>Search</span>
      <svg
        class="w-3.5 mt-px ml-2"
        viewBox="0 0 14 14"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.1499 11C8.91133 11 11.1499 8.76142 11.1499 6C11.1499 3.23858 8.91133 1 6.1499 1C3.38848 1 1.1499 3.23858 1.1499 6C1.1499 8.76142 3.38848 11 6.1499 11Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M13.15 13L9.68335 9.53331"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </button>
    <transition-fade :mode="disableFade ? 'none' : 'in'">
      <div
        v-show="isExpanded === 'search'"
        class="absolute top-16 md:top-20 left-0 w-full h-auto overflow-y-auto c-search-panel"
      >
        <slot name="search" />
      </div>
    </transition-fade>
    <button
      class="the-header__button flex items-center h-full py-4 text-16 leading-1 font-semibold c-primary-menu-trigger"
      :class="classList('menu')"
      :aria-expanded="isExpanded === 'menu'"
      @click="toggleExpanded('menu')"
    >
      <b>Menu</b>
      <span class="relative block ml-2 w-3.5 h-3 -mt-0.5">
        <span
          class="absolute top-1.5 left-0 block w-full h-0.5 bg-current transform transition-all"
          :class="isExpanded === 'menu' ? 'rotate-45' : '-translate-y-1'"
        />
        <span
          class="absolute top-1.5 left-0 block w-full h-0.5 bg-current transform transition-all"
          :class="isExpanded === 'menu' ? 'scale-x-0' : ''"
        />
        <span
          class="absolute top-1.5 left-0 block w-full h-0.5 bg-current transform transition-all"
          :class="isExpanded === 'menu' ? '-rotate-45' : 'translate-y-1'"
        />
      </span>
    </button>
    <transition-fade :mode="disableFade ? 'none' : 'in'">
      <div
        v-show="isExpanded === 'menu'"
        class="absolute top-16 md:top-20 h-content overflow-y-auto bg-blue-navy c-primary-menu-dropdown"
      >
        <slot name="menu" />
      </div>
    </transition-fade>
  </div>
</template>

<script>
import TransitionFade from "./TransitionFade.vue";

export default {
  components: {
    TransitionFade,
  },
  props: {
    resourceTitle: {
      type: String,
      default: "Resources",
    },
  },
  data() {
    return {
      isExpanded: undefined,
      isPreviousExpanded: undefined,
    };
  },
  computed: {
    disableFade() {
      return ["search", "menu"].indexOf(this.isPreviousExpanded) !== -1;
    },
  },
  methods: {
    classList(id) {
      return this.isExpanded === id
        ? "bg-blue-navy text-white"
        : "hover:bg-blue-navy hover:bg-opacity-10";
    },
    toggleExpanded(id) {
      this.isPreviousExpanded = this.isExpanded;
      this.isExpanded = this.isExpanded === id ? undefined : id;
    },
  },
};
</script>
