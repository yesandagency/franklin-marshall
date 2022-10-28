<template>
  <div class="relative w-full">
    <div class="aspect-w-16 aspect-h-9">
      <iframe
        ref="iframe"
        :src="`https://www.youtube.com/embed/${getYoutubeId()}`"
        :tabindex="!isPlaying ? '-1' : false"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
    <transition-fade mode="out">
      <div
        v-show="!isPlaying"
        class="adhere"
      >
        <img
          :src="thumbnailUrl"
          :alt="thumbnailAlt"
          class="adhere object-cover pointer-events-none"
        />
        <button
          v-show="!isPlaying" class="adhere flex flex-center"
          @click="setIsPlaying"
        >
          <span class="sr-only">Reveal Video</span>
          <svg class="md:w-32 w-24 md:h-32 h-24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60 -5.25512e-06C26.8629 -8.15744e-06 -1.4761e-05 26.8629 -1.76525e-05 60C-2.05441e-05 93.1371 26.8629 120 60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 -2.3528e-06 60 -5.25512e-06Z" fill="#F5F9F9"/><path d="M53.8985 41.0001L79.751 59.9814L53.8985 79.1055" fill="#3573E0"/><path d="M60.5766 7.27259C31.2464 7.27258 7.46954 31.0936 7.46954 60.4783C7.46954 89.8631 31.2464 113.684 60.5766 113.684C89.9068 113.684 113.684 89.8631 113.684 60.4783C113.684 31.0936 89.9068 7.27259 60.5766 7.27259Z" stroke="#3573E0" stroke-width="2" stroke-miterlimit="10"/></svg>
        </button>
      </div>
    </transition-fade>
  </div>
</template>

<script>
import TransitionFade from './TransitionFade.vue';
export default {
  components: {
    TransitionFade,
  },
  props: {
    youtubeUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    thumbnailAlt: {
      type: String,
      default: 'Video thumbnail',
    },
  },
  data(){
    return {
      isPlaying: false
    }
  },
  methods: {
    setIsPlaying(){
      this.isPlaying = true;
      this.$refs.iframe.focus();
    },
    getYoutubeId() {
      // Strip the ID out from youtube url
      const url = this.youtubeUrl.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    },
  }
}
</script>
