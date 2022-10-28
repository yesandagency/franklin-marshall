<template>
  <div class="adhere overflow-hidden">
    <div
      class="adhere"
      :style="transformScale"
    >
      <video
        ref="video"
        :src="videoUrl"
        class="w-full max-w-full h-full max-h-full"
        aria-hidden="true"
        playsinline
        muted
        autoplay
        loop
      />
    </div>
    <slot />
  </div>
</template>

<script>
import videoCover from '../util/videoCover';

export default {
  provide() {
    return {
      [ videoCover ]: this,
    };
  },
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      width: undefined,
      height: undefined,
      isPaused: false,
    }
  },
  computed: {
    transformScale() {
      const aspect = this.width / this.height;
      const targetAspect = 16 / 9;
      const scale = aspect / targetAspect > 1
        ? aspect / targetAspect * 1.10
        : targetAspect / aspect * 1.10;
      return {
        ...this.adhere,
        transform: `scale(${scale})`,
      };
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      const { width, height } = this.$el.getBoundingClientRect()
      this.width = width;
      this.height = height;
    },
    togglePlay() {
      const { video } = this.$refs;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      this.isPaused = video.paused;
    },
  },
}
</script>
