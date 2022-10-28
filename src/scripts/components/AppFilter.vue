<template>
  <div>
    <div
      ref="form"
      class="container-md px-1/24 md:px-0 py-8 md:py-12 bg-white shadow-blue"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10 w-20/22 2xl:w-18/22 mx-auto">
        <label
          class="filter__label w-full"
          :class="filters.length > 3 ? 'md:col-span-2' : 'md:col-span-3'"
        >
          {{ searchLabel }}
          <input
            type="text"
            :placeholder="searchPlaceholder"
            class="filter__field filter__field--search"
            v-model.trim="searchInput"
          >
        </label>
        <app-filter-select
          v-for="filter in filters"
          :key="filter.slug"
          v-bind="filter"
        />
      </div>
    </div>
    <div
      ref="results"
      class="container mt-6 md:mt-12"
    >
      <div :class="{ 'md:w-20/22 2xl:w-18/22 mx-auto': mode === 'program' }">
        <div :class="{ 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8': mode === 'faculty' }">
          <component
            :is="mode === 'faculty' ? 'AppFilterCardFaculty' : 'AppFilterCardProgram'"
            v-for="item in pagedResults[currentPageIndex]"
            :key="`result-${item.id}`"
            :data="item"
            :filter-obj="mode === 'faculty' ? false : filterObj"
          />
        </div>
        <app-filter-pagination
          :per-page="perPage"
          :total-page-count="pagedResults.length"
          :total-result-count="filteredItemsSearched.length"
          :current-page-index="currentPageIndex"
        />
        <transition-fade>
          <div
            v-show="!filteredItemsSearched.length"
            class="p-10 md:p-20 lg:p-24 text-center"
          >
            <p class="title-sm">
              Sorry, no results.
            </p>
            <button
              class="p-3 mt-4 text-18 leading-1"
              @click="resetFilters"
            >
              <span class="hover-highlight">
                Reset Filters
              </span>
            </button>
            <br>
            or
            <br>
            <a
              class="inline-block p-3 text-18 leading-1"
              :href="`${siteSearchUrl}?q=${encodeURI(searchInput)}`"
            >
              <span class="hover-highlight">
                {{ siteSearchText }}
              </span>
            </a>
          </div>
        </transition-fade>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import TransitionFade from './TransitionFade.vue';
import AppFilterSelect from './AppFilterSelect.vue';
import AppFilterPagination from './AppFilterPagination.vue';
import AppFilterCardProgram from './AppFilterCardProgram.vue';
import AppFilterCardFaculty from './AppFilterCardFaculty.vue';

import emitter from '../util/emitter';

export default {
  components: {
    TransitionFade,
    AppFilterSelect,
    AppFilterPagination,
    AppFilterCardProgram,
    AppFilterCardFaculty,
  },
  props: {
    jsonEndpoint: {
      type: String,
      required: true,
    },
    perPage: {
      type: [Number, String],
      default: 10,
    },
    mode: {
      type: String,
      default: 'program',
      validator: ( value ) => [
        'program',
        'faculty',
      ].indexOf(value) !== -1,
    },
    searchLabel: {
      type: String,
      default: 'Search',
    },
    searchPlaceholder: {
      type: String,
      default: 'Search',
    },
    siteSearchUrl: {
      type: String,
      required: true,
    },
    siteSearchText: {
      type: String,
      default: 'Search the Entire Site',
    },
  },
  data() {
    return {
      results: [],
      filters: [],
      filterObj: {},
      searchInput: '',
      queryOptions: {},
      currentPageIndex: 0,
      userInput: false,
    }
  },
  created () {
    emitter.on('update-select', this.updateSelect);
    emitter.on('next-page', this.getNextPage);
    emitter.on('previous-page', this.getPreviousPage);
    emitter.on('get-page', this.getPage);
  },
  beforeDestroy () {
    emitter.off('update-select', this.updateSelect);
    emitter.off('next-page', this.getNextPage);
    emitter.off('previous-page', this.getPreviousPage);
    emitter.off('get-page', this.getPage);
  },
  computed: {
    queryOptionsArray() {
      // Creates new array of active queryOptions key value pairs
      return Object.entries(this.queryOptions).map(([key, value]) => ({ key, value }));
    },
    filteredItems() {
      // Filters results based on active select filters
      // Only supports single value per select
      return this.results.filter(item => this.queryOptionsArray.every(({ key, value }) => item[key].includes(value)));
    },
    filteredItemsSearched() {
      let pattern = new RegExp(this.searchInput, 'i');
      return this.filteredItems.filter(result => result.name.match(pattern));
    },
    pagedResults() {
      return _.chunk(this.filteredItemsSearched, this.perPage);
    },
    // If you need fuzzy search use https://fusejs.io/
    // filteredItemsSearchedFuzzy() {
    //   const { search, filteredItemsSingle } = this
    //   const fuzzy = initializeFuse(filteredItemsSingle)
    //   return search.length ? fuzzy.search(search) : filteredItemsSingle
    // },
  },
  watch: {
    filteredItemsSearched() {
      // Reset to first page
      this.currentPageIndex = 0;
      // Prevent auto scroll on page load
      if (!this.userInput) {
        this.userInput = true;
        return;
      }
      this.scrollToRef('form');
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(this.jsonEndpoint);
        const responseObj = await response.json();
        this.filters = responseObj.filters;
        this.results = responseObj.results;
        this.createFilterObj();
      } catch(e) {
        console.log(e);
      }
    },
    createFilterObj() {
      this.filters.forEach(({ slug, options }) => {
        const optionsObj = {};
        options.forEach(({ slug, title }) => optionsObj[slug] = title);
        this.filterObj[slug] = optionsObj;
      });
    },
    updateSelect({ slug, value }) {
      // Using `$delete` and `$set` because of Vue change detection caveats
      if (!value) {
        this.$delete(this.queryOptions, slug);
        return;
      }
      this.$set(this.queryOptions, slug, value);
    },
    resetFilters() {
      emitter.emit('reset-filters');
      this.searchInput = '';
    },
    getNextPage() {
      this.currentPageIndex += 1;
      this.scrollToRef('results');
    },
    getPreviousPage() {
      this.currentPageIndex -= 1;
      this.scrollToRef('results');
    },
    getPage(index) {
      this.currentPageIndex = index;
      this.scrollToRef('results');
    },
    scrollToRef(ref) {
      let { top } = this.$refs[ref].getBoundingClientRect();
      top = top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    },
  },
}
</script>
