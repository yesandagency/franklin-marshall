<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script>
import accordion from '../util/accordion';

export default {
  provide() {
    return {
      [ accordion ]: this,
    };
  },
  props: {
    tag: {
      type: String,
      default: 'ul',
    },
    allowMultiple: {
      type: Boolean,
      default: false,
    },
    defaultPanelId: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      allIds: [],
      expandedIds: [],
    };
  },
  methods: {
    handlePanel(panelId) {
      if (this.allowMultiple) {
        this.handleMultiple(panelId);
      } else {
        this.handleSingle(panelId);
      }
    },
    handleMultiple(panelId) {
      const panelIndex = this.expandedIds.indexOf(panelId);
      if (panelIndex > -1) {
        this.expandedIds.splice(panelIndex, 1);
        return;
      }
      this.expandedIds.push(panelId);
    },
    handleSingle(panelId) {
      if (!this.expandedIds.length) {
        this.expandedIds.push(panelId);
        return;
      }
      const [ expandedId ] = this.expandedIds;
      if (panelId === expandedId) {
        this.expandedIds = [];
        return;
      }
      this.expandedIds = [panelId];
    },
    handleAll(mode) {
      if (mode === 'collapse') {
        this.expandedIds = [];
        return;
      }
      this.allIds.forEach(id => {
        if (this.expandedIds.indexOf(id) === -1) {
          this.expandedIds.push(id);
        }
      });
    },
  },
};
</script>
