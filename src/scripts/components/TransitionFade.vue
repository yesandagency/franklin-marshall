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
  },
  methods: {
    enter( el, done ) {
      gsap.fromTo(
        el,
        {
          alpha: 0,
        },
        {
          alpha: 1,
          duration: this.mode.toLowerCase().includes( 'in' ) ? 0.3 : 0,
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
          duration: this.mode.toLowerCase().includes( 'out' ) ? 0.3 : 0,
          ease: 'none',
          onComplete: done,
        },
      );
    },
  },
};
</script>
