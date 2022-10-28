<template>
  <div
    v-show="totalResultCount"
    class="flex justify-between items-center mt-10 text-18 leading-1 font-light tracking-slight"
  >
    <div
      class="flex items-center"
      v-show="totalPageCount > 1"
    >
      <button
        class="transform rotate-180"
        :class="{ 'opacity-50 pointer-events-none': currentPageIndex === 0 }"
        :disabled="currentPageIndex === 0"
        @click="getPrevious"
      >
        <span class="sr-only">Previous page</span>
        <span class="cta-icon w-6 h-6">
          <svg class="adhere text-blue-navy" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4545 0.954581L15.5454 7.00003L9.4545 13.0909" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M0.454591 7.09094L15.4546 7.09094" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
          <svg class="cta-icon__front adhere text-red" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4545 0.954581L15.5454 7.00003L9.4545 13.0909" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M0.454591 7.09094L15.4546 7.09094" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
        </span>
      </button>
      <div
        v-show="showNumbers"
        class="hidden md:inline-block ml-2"
      >
        <button
          v-for="i in firstThree"
          :key="`page-${i}`"
          class="py-1 px-1.5"
          :class="{ 'font-semibold': i === currentPageIndex }"
          @click="getPage(i)"
        >
          <span class="hover-highlight">
            <span class="sr-only">Jump to page</span>
            {{ i + 1 }}
          </span>
        </button>
        <span class="inline-block py-1 px-1.5">
          &hellip;
        </span>
      </div>
    </div>
    <div class="flex-grow text-center">
      {{ countMessage }}
    </div>
    <div
      v-show="totalPageCount > 1"
      class="flex items-center"
    >
      <div
        v-show="showNumbers"
        class="hidden md:inline-block mr-2"
      >
        <span class="inline-block py-1 px-1.5">
          &hellip;
        </span>
        <button
          v-for="i in lastThree"
          :key="`page-${i}`"
          class="py-1 px-1.5"
          :class="{ 'font-semibold': i === currentPageIndex }"
          @click="getPage(i)"
        >
          <span class="hover-highlight">
            <span class="sr-only">Jump to page</span>
            {{ i + 1 }}
          </span>
        </button>
      </div>
      <button
        @click="getNext"
        class="p-1"
        :class="{ 'opacity-50 pointer-events-none': currentPageIndex + 1 === totalPageCount }"
        :disabled="currentPageIndex + 1 === totalPageCount"
      >
        <span class="sr-only">Next page</span>
        <span class="cta-icon w-6 h-6">
          <svg class="adhere text-blue-navy" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4545 0.954581L15.5454 7.00003L9.4545 13.0909" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M0.454591 7.09094L15.4546 7.09094" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
          <svg class="cta-icon__front adhere text-red" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.4545 0.954581L15.5454 7.00003L9.4545 13.0909" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/><path d="M0.454591 7.09094L15.4546 7.09094" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"/></svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import emitter from '../util/emitter';

export default {
  props: {
    perPage: {
      type: [Number, String],
      required: true,
    },
    currentPageIndex: {
      type: Number,
      default: 0,
    },
    totalPageCount: {
      type: Number,
      default: 0,
    },
    totalResultCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showingFrom() {
      return this.perPage * this.currentPageIndex + 1;
    },
    showingTo() {
      if (this.showingFrom === this.totalResultCount) {
        return false;
      }
      const maxAtCurrentPage = (this.currentPageIndex + 1) * this.perPage;
      if (maxAtCurrentPage > this.totalResultCount) {
        return `-${this.totalResultCount}`;
      }
      return `-${maxAtCurrentPage}`;
    },
    countMessage() {
      return `Showing ${this.showingFrom}${this.showingTo || ''} of ${this.totalResultCount}`;
    },
    showNumbers() {
      return this.totalPageCount >= 6;
    },
    lastThree() {
      if (!this.showNumbers) {
        return [];
      }
      const lastThreeItems = [];
      for (let i = 0; i < 3; i++) {
        lastThreeItems.unshift((this.totalPageCount - 1) - i);
      }
      return lastThreeItems;
    },
    firstThree() {
      if (!this.showNumbers) {
        return [];
      }
      const { currentPageIndex, totalPageCount } = this;
      const firstThreeItems = [];
      let startIndex = currentPageIndex <= 2 ? 0 : currentPageIndex;
      if (startIndex > totalPageCount - 6) {
        startIndex = totalPageCount - 6
      }
      for (let i = startIndex; i < startIndex + 3; i++) {
        firstThreeItems.push(i);
      }
      return firstThreeItems;
    },
  },
  methods: {
    getPrevious() {
      emitter.emit('previous-page');
    },
    getNext() {
      emitter.emit('next-page');
    },
    getPage(index) {
      emitter.emit('get-page', index);
    },
  },
}
</script>
