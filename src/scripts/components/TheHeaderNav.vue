<template>
  <div @keyup.esc="isExpanded = undefined">
    <div class="c-the-headernav-wrapper flex gap-10 relative">
      <slot name="menu" />
      <div>
      <button
        class="the-header__button flex items-center h-full py-4 text-16 leading-1 font-semibold c-primary-menu-trigger"
        :class="classList('menu')"
        :aria-expanded="isExpanded === 'menu'"
        @click="toggleExpanded('menu')"
      ><span>Menu</span>
        <svg
          class="w-3.5 mt-px ml-2 mr-2.5"
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
    </div>

      <transition-fade :mode="disableFade ? 'none' : 'in'">
        <div
          v-show="isExpanded === 'menu'"
          class="absolute top-16 h-content overflow-y-auto bg-blue-navy c-primary-menu-dropdown right-0"
        >

          <slot name="hamburgermenu" />
        </div>
      </transition-fade>
    </div>
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
      return this.isExpanded === id ? "" : "";
    },
    toggleExpanded(id) {
      this.isPreviousExpanded = this.isExpanded;
      this.isExpanded = this.isExpanded === id ? undefined : id;
    },
  },
};
</script>
