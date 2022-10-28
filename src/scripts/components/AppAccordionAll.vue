<template>
	<button @click="handleClick">
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
		mode: {
			type: String,
			default: 'expand',
      validator: ( value ) => [
        'expand',
        'collapse',
      ].indexOf(value) !== -1,
		},
	},
	methods: {
		handleClick() {
			this.accordion.handleAll(this.mode);
		},
	},
};
</script>
