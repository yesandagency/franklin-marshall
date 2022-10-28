<template>
	<transition
		:css="false"
		@enter="enter"
		@leave="leave"
	>
		<slot />
	</transition>
</template>

<script>
import gsap from 'gsap';

export default {
	methods: {
		enter( el, done ) {
			gsap.set(
				el,
				{
					height: 'auto',
					overflow: 'hidden',
				},
			);
			gsap.from(
				el,
				{
					height: 0,
					duration: 0.3,
          ease: 'power4.out',
          clearProps: 'height',
					onComplete: done,
				},
			);
		},
		leave( el, done ) {
			gsap.set(
				el,
				{ overflow: 'hidden' },
			);
			gsap.to(
				el,
				{
					height: 0,
					duration: 0.3,
					ease: 'power4.out',
					onComplete: done,
				},
			);
		},
	},
};
</script>
