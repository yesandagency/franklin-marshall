<template>
  <nav>
    <button
      v-if="isSmallViewport"
      class="flex w-full justify-between items-center py-5 px-7 text-16 leading-1 font-display tracking-slight"
      @click="toggleExpanded"
    >
      <span class="sr-only">{{ isExpanded ? 'Collapse' : 'Expand' }}</span>
      {{ buttonText }}
      <svg class="w-4 h-4 mt-px ml-2.5 text-blue" :class="{ 'transform rotate-180': isExpanded }" aria-hidden="true" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.9846 0.999999L9.0969 9L1.1499 1" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
    </button>
    <div v-show="!isSmallViewport || isExpanded">
      <slot />
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: 'Menu',
    },
  },
  data() {
    return {
      isExpanded: false,
      width: window.innerWidth,
    }
  },
  computed: {
    isSmallViewport() {
      return this.width < 768;
    },
  },
  mounted() {
    window.addEventListener('resize', this.setWidth);
    this.setWidth();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth);
  },
  methods: {
    setWidth() {
      this.width = window.innerWidth;
    },
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>
