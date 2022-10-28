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
  methods: {
    enter( el, done ) {
      gsap.fromTo(
        el,
        {
          alpha: 0,
          x: -15,
        },
        {
          alpha: 1,
          x: 0,
          duration: 0.3,
          delay: 0.1,
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
          duration: 0,
          ease: 'none',
          onComplete: done,
        },
      );
    },
  },
};
</script>
