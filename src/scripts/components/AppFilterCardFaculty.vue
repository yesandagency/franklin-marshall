<template>
  <div class="bg-white">
    <a
      :href="data.url"
      class="block relative w-full h-64 md:h-72 xl:h-80 bg-blue-ash overflow-hidden"
    >
      <span class="sr-only">
        {{ data.name }}
      </span>
      <img
        v-if="image.src"
        class="filter__image adhere object-cover pointer-events-none"
        :alt="image.alt || data.name"
        :src="image.src"
      >
    </a>
    <div class="p-6 md:p-8 xl:p-10">
      <h3 class="mb-2.5 font-display font-semibold text-32 xl:text-40 leading-1 tracking-slight">
        <a class="hover-highlight" :href="data.url">
          <span class="relative">
            {{ data.name }}
          </span>
        </a>
      </h3>
      <h4 class="mb-4 text-14 md:text-16 leading-120 tracking-wider uppercase">
        {{ data.title }}
      </h4>
      <div class="text-16 md:text-18 leading-150 font-light tracking-slight">
        <address v-if="data.address" class="mb-4 not-italic">
          <p v-html="data.address" />
        </address>
        <p v-if="data.phone">
          <a :href="`tel:${strippedPhone}`">
            {{ data.phone }}
          </a>
        </p>
        <p v-if="data.email">
          <a :href="`mailto:${data.email}`" class="underline hover:no-underline hover-highlight">
            {{ data.email }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import gsap from 'gsap';

export default {
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  computed: {
    image() {
      return this.data.image;
    },
    strippedPhone() {
      return this.data.phone.replace(/\s/g, '');
    },
  },
  mounted() {
    gsap.fromTo(
      this.$el,
      {
        y: 15,
        alpha: 0,
      },
      {
        y: 0,
        alpha: 1,
        duration: 0.4,
        delay: 0.2,
        ease: 'power2.out',
      },
    );
  },
}
</script>
