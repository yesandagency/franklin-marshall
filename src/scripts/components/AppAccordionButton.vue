<template>
	<button
		:aria-expanded="expanded.toString()"
		:aria-controls="controls"
    :id="`${controls}-button`"
		@click="handleClick"
	>
		<slot />
	</button>
</template>

<script>
import accordion from '../util/accordion';

export default {
	inject: {
		accordion,
	},
	props: {
		controls: {
			type: String,
			required: true,
			validator: ( value ) => ! value.includes( ' ' ),
		},
    defaultExpanded: {
      type: Boolean,
      default: false,
    },
	},
	computed: {
		expanded() {
			return this.accordion.expandedIds.includes(this.controls);
		},
	},
  mounted () {
    if (this.defaultExpanded) {
      this.handleClick();
    };
  },
	methods: {
		handleClick() {
			this.accordion.handlePanel(this.controls);
		},
	},
};
</script>
