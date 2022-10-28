<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
import gsap from 'gsap';

export default {
  props: {
    mode: {
      type: String,
      default: 'inOut',
    },
    distanceIn: {
      type: [Boolean, Number, String],
      default: false,
    },
    distanceOut: {
      type: [Boolean, Number, String],
      default: false,
    },
  },
  methods: {
    enter( el, done ) {
      gsap.fromTo(
        el,
        {
          alpha: 0,
          x: this.distanceIn,
        },
        {
          alpha: 1,
          x: 0,
          duration: this.mode.toLowerCase().includes( 'in' ) ? 0.5 : 0,
          ease: 'power2.out',
          onComplete: done,
        },
      );
    },
    leave( el, done ) {
      gsap.to(
        el,
        {
          alpha: 0,
          x: this.distanceOut,
          duration: this.mode.toLowerCase().includes( 'out' ) ? 0.5 : 0,
          ease: 'none',
          onComplete: done,
        },
      );
    },
  },
};
</script>
