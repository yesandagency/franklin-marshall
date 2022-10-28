<template>
  <a @click.prevent="jumpToSection">
    <slot />
  </a>
</template>

<script>
export default {
  methods: {
    jumpToSection() {
      const { offsetTop } = document.querySelector(this.$attrs.href);
      const offsetPosition = offsetTop - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  },
};
</script>
