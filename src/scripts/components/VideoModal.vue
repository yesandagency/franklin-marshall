<template>
  <transition-fade mode="in">
    <div
      v-if="modalOpen"
      class="fixed top-0 left-0 z-40 w-full h-full flex flex-center bg-blue-navy bg-opacity-95 overflow-y-auto"
      @keydown.esc="toggleModal(modalId)"
    >
      <div
        class="adhere"
        @click="toggleModal(modalId)"
      />
      <button
        ref="dismissButton"
        class="absolute top-0 right-0 z-1 flex flex-center w-10 md:w-14 h-10 md:h-14 bg-blue text-white"
        @click="toggleModal(modalId)"
      >
        <span class="sr-only">Collapse modal</span>
        <svg class="w-4 md:w-6 h-4 md:h-6" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 16.8347L9 8.947L17 1" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/><path d="M1 1.00002L9 8.88772L1 16.8347" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/></svg>
      </button>
      <div class="container my-auto">
        <div class="lg:max-w-20/22 2xl:max-w-18/22 mx-auto">
          <div class="aspect-w-16 aspect-h-9 bg-black">
            <iframe
              v-if="youtubeUrl"
              :src="`https://www.youtube.com/embed/${getYoutubeId()}`"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition-fade>
</template>

<script>
import emitter from '../util/emitter';
import TransitionFade from './TransitionFade.vue';

export default {
	components: {
		TransitionFade,
	},
	props: {
		modalId: {
			type: String,
			required: true,
		},
    youtubeUrl: {
      type: String,
      default: '',
    },
	},
	data() {
		return {
			modalOpen: false,
		};
	},
	created() {
		emitter.on('toggle-modal', this.toggleModal);
	},
  updated() {
    if (this.modalOpen) {
      this.$refs.dismissButton.focus();
    };
  },
	methods: {
		toggleModal(modalId) {
			if (modalId === this.modalId) {
				this.modalOpen = !this.modalOpen;
			}
		},
    getYoutubeId() {
      // Strip the ID out from youtube url
      const url = this.youtubeUrl.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    },
	},
};
</script>
