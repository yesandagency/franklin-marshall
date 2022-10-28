<template>
  <button @click="handleClick">
    <span
      class="sr-only"
      v-text="videoCover.isPaused ? 'Play video' : 'Pause video'"
    />
    <TransitionFade mode="in">
      <svg v-show="videoCover.isPaused" class="w-full" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4 0, 20 10, 4 20" fill="currentColor" /></svg>
    </TransitionFade>
    <TransitionFade mode="in">
      <svg v-show="!videoCover.isPaused" class="w-full" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" width="5" height="20" fill="currentColor" /><rect x="12.5" width="5" height="20" fill="currentColor" /></svg>
    </TransitionFade>
  </button>
</template>

<script>
import videoCover from '../util/videoCover';
import TransitionFade from './TransitionFade.vue';

export default {
  components: {
    TransitionFade,
  },
  inject: {
    videoCover,
  },
  methods: {
    handleClick() {
      this.videoCover.togglePlay();
    }
  },
}
</script>
