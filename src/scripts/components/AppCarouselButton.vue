<template>
  <button @click="handleDirection">
    <slot />
  </button>
</template>

<script>
import carousel from '../util/carousel';

export default {
  inject: {
    carousel,
  },
  props: {
    direction: {
      type: String,
      required: true,
      validator: ( prop ) => [ 'next', 'previous' ].includes( prop ),
    },
  },

  methods: {
    handleDirection() {
      this.carousel.$emit( 'set:direction', this.direction );
    },
  },
};
</script>
