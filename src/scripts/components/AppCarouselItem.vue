<template>
  <transition-carousel>
    <div v-show="isCurrentItem">
      <slot />
    </div>
  </transition-carousel>
</template>

<script>
import TransitionCarousel from './TransitionCarousel.vue';

import carousel from '../util/carousel';
// import Hammer from 'hammerjs';

export default {
  components: {
    TransitionCarousel,
  },
  inject: {
    carousel,
  },
  computed: {
    isCurrentItem() {
      return this.carousel.currentItem === this;
    },
  },
  // mounted() {
  //   const hammer = new Hammer( this.$el );
  //   hammer.on( 'swipeleft', () => this.setDirection( 'next' ) );
  //   hammer.on( 'swiperight', () => this.setDirection( 'previous' ) );
  // },
  created() {
    this.carousel.$emit( 'create:items', this );
  },
  // methods: {
  //   handleEvent() {
  //     this.carousel.$emit( 'set:item', this );
  //   },
  //   setDirection( direction ) {
  //     this.carousel.$emit( 'set:direction', direction );
  //   },
  // },
};
</script>
