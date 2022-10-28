<template>
  <header :class="{ 'scroll-top': watchScroll && isScrollTop }">
    <slot />
  </header>
</template>

<script>
export default {
  props: {
    watchScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isScrollTop: true,
    }
  },
  mounted () {
    if (!this.watchScroll) {
      return;
    }
    window.addEventListener( 'scroll', this.handleScroll );
    window.scroll();
  },
  beforeDestroy () {
    if (!this.watchScroll) {
      return;
    }
		window.removeEventListener( 'scroll', this.handleScroll );
  },
  methods: {
		handleScroll() {
			this.isScrollTop = window.scrollY <= 24;
		},
  },
}
</script>
