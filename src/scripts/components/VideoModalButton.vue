<template>
	<button @click="handleClick">
		<slot />
	</button>
</template>

<script>
import emitter from '../util/emitter';

export default {
	props: {
		modalId: {
			type: String,
			required: true,
		},
	},
	methods: {
		handleClick() {
			emitter.emit( 'toggle-modal', this.modalId );
		},
	},
};
</script>
