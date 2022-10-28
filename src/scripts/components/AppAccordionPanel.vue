<template>
  <component :is="transitionName">
    <div
      :aria-labelledby="!isDefault && `${id}-button`"
      :id="id"
      :class="{ 'expanded': isExpanded }"
      v-show="isExpanded"
    >
      <slot />
    </div>
  </component>
</template>

<script>
import accordion from '../util/accordion';
import TransitionSubmenu from './TransitionSubmenu.vue';
import TransitionHeight from './TransitionHeight.vue';

export default {
  inject: {
    accordion,
  },
  components: {
    TransitionSubmenu,
    TransitionHeight,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    transitionName: {
      type: String,
      default: 'TransitionHeight',
      validator: ( value ) => [
        'TransitionHeight',
        'TransitionSubmenu',
      ].indexOf(value) !== -1,
    },
  },
  mounted () {
    this.accordion.allIds.push(this.id);
  },
  computed: {
    isDefault() {
      return this.accordion.defaultPanelId === this.id;
    },
    isExpanded() {
      // Expand default panel if nothing else is expanded
      if (this.isDefault) {
        return !this.accordion.expandedIds.length;
      }
      return this.accordion.expandedIds.includes(this.id);
    },
  },
};
</script>
