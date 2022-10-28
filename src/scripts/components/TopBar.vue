<template>
  <transition-fade mode="out">
    <div
      v-show="!isDismissed"
      class="py-4 md:py-5"
      :class="`top-bar__${mode}`"
    >
      <div class="w-22/24 mx-auto flex items-center">
        <div class="top-bar__content flex-grow">
          <slot />
        </div>
        <button
          v-if="this.mode !== 'alert'"
          class="flex w-8 h-8 ml-5 md:ml-10 flex-center flex-shrink-0 hover:bg-white hover:bg-opacity-50 transition-colors"
          @click="handleDismiss"
        >
          <span class="sr-only">Dismiss notification</span>
          <svg class="w-4 h-4" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 16.8347L9 8.947L17 1" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/><path d="M1 1.00002L9 8.88772L1 16.8347" stroke="currentColor" stroke-width="2" stroke-miterlimit="10"/></svg>
        </button>
      </div>
    </div>
  </transition-fade>
</template>

<script>
import TransitionFade from './TransitionFade.vue';

export default {
  components: {
    TransitionFade,
  },
  props: {
    mode: {
      type: String,
      default: 'notification',
      validator: ( value ) => [
        'alert',
        'notification',
      ].indexOf(value) !== -1,
    },
    notificationId: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      isDismissed: true,
    }
  },
  mounted () {
    if (this.mode === 'alert' || !this.notificationId) {
      this.isDismissed = false;
      return;
    }
		this.isDismissed = window.sessionStorage.dismissedNotificationId === this.notificationId;
  },
  methods: {
    handleDismiss() {
      this.isDismissed = true;
			sessionStorage.setItem( 'dismissedNotificationId', this.notificationId );
    },
  },
};
</script>
