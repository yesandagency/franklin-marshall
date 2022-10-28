<template>
  <label class="filter__label">
    {{ title }}
    <select
      v-model="value"
      class="filter__field filter__field--select"
      :class="{ 'text-blue-gray': !value }"
      @change="handleChange"
    >
      <option value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="`${slug}-${option.slug}`"
        :value="option.slug"
      >
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

<script>
import emitter from '../util/emitter';

export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    options: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      value: '',
    }
  },
  created () {
    emitter.on('reset-filters', this.resetFilter);
  },
  beforeDestroy () {
    emitter.off('reset-filters', this.resetFilter);
  },
  methods: {
    handleChange() {
      const { slug, value } = this;
      emitter.emit('update-select', { slug, value });
    },
    resetFilter() {
      this.value = '';
      this.handleChange();
    }
  },
}
</script>
