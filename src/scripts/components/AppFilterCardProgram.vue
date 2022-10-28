<template>
  <a
    class="block md:flex items-center py-6 lg:py-12 border-b-2 border-blue-ash"
    :href="data.url"
  >
    <div class="relative w-full md:w-56 lg:w-72 h-52 md:h-40 lg:h-56 mb-5 md:mb-0 flex-shrink-0 bg-blue-ash overflow-hidden">
      <img
        v-if="image.src"
        class="filter__image adhere object-cover pointer-events-none"
        :alt="image.alt || data.name"
        :src="image.src"
      >
    </div>
    <div class="flex w-full items-end flex-grow md:ml-1/22 lg:ml-2/22">
      <div class="flex-grow leading-115">
        <h3 class="inline hover-highlight-child font-display font-semibold text-26 lg:text-40 tracking-slight">
          <span class="relative">
            {{ data.name }}
          </span>
        </h3>
        <h4 class="mt-2 lg:mt-3 text-14 text-blue-gray tracking-wide uppercase">
          {{ programTypes }}
        </h4>
        <p class="mt-3 lg:mt-5 text-18 leading-130">
          {{ collegeDepartment }}
        </p>
      </div>
      <div class="cta-icon w-12 h-12 ml-4 lg:ml-10 flex-shrink-0">
        <svg class="adhere text-red" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.4242 15.9242L38.5757 26L28.4242 36.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M13.4243 26.1515L38.4243 26.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M25.9998 1.75758C12.6111 1.75758 1.75735 12.6113 1.75735 26C1.75734 39.3887 12.611 50.2424 25.9998 50.2424C39.3885 50.2424 50.2422 39.3887 50.2422 26C50.2422 12.6113 39.3885 1.75758 25.9998 1.75758Z" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
        <svg class="cta-icon__front adhere text-blue-navy" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.4242 15.9242L38.5757 26L28.4242 36.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M13.4243 26.1515L38.4243 26.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M25.9998 1.75758C12.6111 1.75758 1.75735 12.6113 1.75735 26C1.75734 39.3887 12.611 50.2424 25.9998 50.2424C39.3885 50.2424 50.2422 39.3887 50.2422 26C50.2422 12.6113 39.3885 1.75758 25.9998 1.75758Z" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
      </div>
    </div>
  </a>
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
    filterObj: {
      type: Object,
      default: {},
    },
  },
  computed: {
    image() {
      return this.data.image;
    },
    programTypes() {
      return this.getMappedOptions('programType');
    },
    collegeDepartment() {
      const collegeString = this.getMappedOptions('college');
      const departmentString = this.getMappedOptions('department', collegeString);
      return departmentString;
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
  methods: {
    getMappedOptions(filterSlug, initialString) {
      let string = initialString || '';
      this.data[filterSlug].forEach((optionSlug) => {
        const mappedOption = _.get(this.filterObj, `${filterSlug}[${optionSlug}]`, optionSlug);
        string += string ? `, ${mappedOption}` : mappedOption;
      });
      return string;
    }
  },
}
</script>
