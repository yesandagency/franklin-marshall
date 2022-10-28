<template>
  <div
    class="container relative"
    @keyup="handleKeyUp"
  >
    <div class="carousel-title-container">
      <h2 class="pb-3 md:pb-0 text-14 leading-1 uppercase tracking-wide text-blue-gray transform md:rotate-180">
        {{title}}
      </h2>
    </div>
    <div class="carousel-wrapper">
      <div ref="carousel" class="carousel">
       <slot />
      </div>
    </div>
    <div class="flex justify-center md:justify-end mt-6 md:mt-8">
      <div class="transform rotate-180">
        <button
          class="block"
          @click="onLeftClick"
        >
          <span class="sr-only">Previous Slide</span>
          <span class="cta-icon w-8 md:w-12 h-8 md:h-12">
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="adhere text-red"><path d="M28.4242 15.9242L38.5757 26L28.4242 36.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M13.4243 26.1515L38.4243 26.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M25.9998 1.75758C12.6111 1.75758 1.75735 12.6113 1.75735 26C1.75734 39.3887 12.611 50.2424 25.9998 50.2424C39.3885 50.2424 50.2422 39.3887 50.2422 26C50.2422 12.6113 39.3885 1.75758 25.9998 1.75758Z" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path></svg>
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="cta-icon__front adhere text-orange"><path d="M28.4242 15.9242L38.5757 26L28.4242 36.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M13.4243 26.1515L38.4243 26.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M25.9998 1.75758C12.6111 1.75758 1.75735 12.6113 1.75735 26C1.75734 39.3887 12.611 50.2424 25.9998 50.2424C39.3885 50.2424 50.2422 39.3887 50.2422 26C50.2422 12.6113 39.3885 1.75758 25.9998 1.75758Z" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path></svg>
          </span>
        </button>
      </div>
      <button
        class="block ml-5"
        @click="onRightClick"
      >
        <span class="sr-only">Next Slide</span>
        <span class="cta-icon w-8 md:w-12 h-8 md:h-12">
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="adhere text-red"><path d="M28.4242 15.9242L38.5757 26L28.4242 36.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M13.4243 26.1515L38.4243 26.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M25.9998 1.75758C12.6111 1.75758 1.75735 12.6113 1.75735 26C1.75734 39.3887 12.611 50.2424 25.9998 50.2424C39.3885 50.2424 50.2422 39.3887 50.2422 26C50.2422 12.6113 39.3885 1.75758 25.9998 1.75758Z" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path></svg>
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" class="cta-icon__front adhere text-orange"><path d="M28.4242 15.9242L38.5757 26L28.4242 36.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M13.4243 26.1515L38.4243 26.1515" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path> <path d="M25.9998 1.75758C12.6111 1.75758 1.75735 12.6113 1.75735 26C1.75734 39.3887 12.611 50.2424 25.9998 50.2424C39.3885 50.2424 50.2422 39.3887 50.2422 26C50.2422 12.6113 39.3885 1.75758 25.9998 1.75758Z" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" vector-effect="non-scaling-stroke"></path></svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data(){
    return {
      card: null,
      cardWidth: null,
      carouselWidth: null,
      cardStyle: null,
      cardMarginRight: null,
      cardCount: null,
      offset: 0,
      maxX: null
    }
  },
  mounted(){
    this.cardCount = this.$refs.carousel.querySelectorAll('.card').length;
    this.carouselWidth = this.$refs.carousel.offsetWidth;
    this.card = this.$refs.carousel.querySelector('.card');

    this.cardStyle = this.card.currentStyle || window.getComputedStyle(this.card);
    this.cardWidth = Number(this.cardStyle.width.match(/\d+/g)[0])
    this.cardMarginRight = Number(this.cardStyle.marginRight.match(/\d+/g)[0]);
    this.maxX = -((this.cardCount / 4) * this.carouselWidth + (this.cardMarginRight * (this.cardCount / 4)) - this.carouselWidth - this.cardMarginRight)
    this.maxX = -((this.cardCount * (this.cardWidth + this.cardMarginRight)) - (this.cardWidth + this.cardMarginRight));
  },
  methods: {
    onLeftClick(){
      if(this.offset !== 0){
        this.offset += this.cardWidth + this.cardMarginRight;
        this.$refs.carousel.style.transform = `translateX(${this.offset}px)`
      }
    },
    onRightClick(){
      if(this.offset !== this.maxX){
        this.offset -= this.cardWidth + this.cardMarginRight;
        this.$refs.carousel.style.transform = `translateX(${this.offset}px)`;
      }
    },
    handleKeyUp( { key } ) {
      if (key === 'ArrowLeft') {
        this.onLeftClick();
      } else if (key === 'ArrowRight') {
        this.onRightClick();
      }
    },
  }
}
</script>
