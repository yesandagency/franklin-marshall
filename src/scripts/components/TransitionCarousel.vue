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
        },
        {
          alpha: 1,
          duration: 0.7,
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
          y: 0,
          duration: 0,
          ease: 'none',
          onComplete: done,
        },
      );
    },
  },
};
</script>
