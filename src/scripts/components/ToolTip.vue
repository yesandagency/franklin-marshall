<template>
  <span
    class="relative inline"
    @keyup.esc="collapseTooltip"
  >
    <a
      class="tooltip inline font-semibold text-blue text-left underline"
      href="#"
      @click.prevent="toggleTooltip"
    >
      {{ linkText }}<span class="w-5 h-5 inline-flex flex-center ml-1 font-semibold rounded-full bg-blue text-white text-14 leading-1 flex-shrink-0">?</span>
    </a>
    <span ref="icon" class="relative inline-block w-5 h-5 -mb-1 -ml-5 pointer-events-none">
      <transition-tooltip>
        <span v-show="tooltipIsVisible">
          <span
            ref="panel"
            class="tooltip-panel absolute w-64 md:w-80 h-auto p-6 pr-10 bg-blue text-white z-1 cursor-default pointer-events-auto"
            :class="`tooltip-panel--${tooltipAlign}`"
            :style="tooltipAlign === 'full' ? { width: '84vw', left: `calc((${offsetX}px - 8vw) * -1)` } : false"
          >
            <button
              class="absolute top-0 right-0 w-10 h-10 flex flex-center hover:bg-blue-dark hover:bg-opacity-50 transition-colors"
              @click="toggleTooltip"
            >
              <span class="sr-only">Collapse tooltip</span>
              <svg class="w-4 h-4" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 16.8347L9 8.947L17 1" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/><path d="M1 1.00002L9 8.88772L1 16.8347" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/></svg>
            </button>
            <slot />
          </span>
          <span class="tooltip-caret absolute bottom-full left-0 w-5 h-3.5 bg-blue" />
        </span>
      </transition-tooltip>
    </span>
  </span>
</template>

<script>
import TransitionTooltip from './TransitionTooltip.vue';

export default {
  components: {
    TransitionTooltip,
  },
  props: {
    linkText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      offsetX: 0,
      tooltipAlign: 'center',
      tooltipIsVisible: false,
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
      if (this.tooltipIsVisible) {
        this.setPosition();
      }
    },
    setPosition() {
      const { x } = this.$refs.icon.getBoundingClientRect();
      const { width } = this.$refs.panel.getBoundingClientRect();
      this.offsetX = x;

      if (this.isSmallViewport) {
        this.tooltipAlign = 'full';
        return;
      }

      if (x - (width / 2) <= 15) {
        this.tooltipAlign = 'left';
        return;
      }

      if (this.width - (x + 16) <= (width / 2) + 15) {
        this.tooltipAlign = 'right';
        return;
      }

      this.tooltipAlign = 'center'
    },
    toggleTooltip() {
      this.tooltipIsVisible = !this.tooltipIsVisible;
      if (this.tooltipIsVisible) {
        window.setTimeout(this.setPosition, 100);
      }
    },
    collapseTooltip() {
      this.tooltipIsVisible = false;
    },
  },
};
</script>
