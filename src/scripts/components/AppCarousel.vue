<template>
  <div @keyup="handleKeyUp">
    <slot />
    <ul class="hidden md:flex justify-center space-x-4 mt-10">
      <li
        v-for="(item, index) in items"
        :key="`indicator-${index}`"
        class="block"
      >
        <button
          class="block w-3 h-3 bg-white hover:bg-blue border-2 border-blue rounded-full focus:outline-none focus:ring transition-colors"
          :class="{ 'bg-blue text-white': currentItemIndex === index }"
          @click="setItem(items[index])"
        >
          <span class="sr-only">
            Slide {{ index + 1 }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import carousel from '../util/carousel';

export default {
  provide() {
    return {
      [ carousel ]: this,
    };
  },
  data() {
    return {
      items: [],
      currentItem: null,
    };
  },
  computed: {
    currentItemIndex() {
      return this.items.indexOf( this.currentItem );
    },
  },
  created() {
    // set item
    this.$on( 'set:item', this.setItem );
    // creates items
    this.$on( 'create:items', this.createItems );
    // carousel direction has callback which
    // is a string prop either previous or next
    this.$on( 'set:direction', ( direction ) => this[ `${ direction }Item` ]() );
  },
  methods: {
    setItem( item ) {
      this.currentItem = item;
    },
    createItems( item ) {
      this.items.push( item );
      if ( ! this.currentItem ) {
        this.setItem( item );
      }
    },
    nextItem() {
      this.setDirection( this.currentItemIndex + 1 );
    },
    previousItem() {
      this.setDirection( this.currentItemIndex - 1 );
    },
    setDirection( direction ) {
      const { items } = this;
      const { length } = items;
      const currentItem = items[ ( ( direction % length ) + length ) % length ];
      this.setItem( currentItem );
    },

    handleKeyUp( event ) {
      const direction = {
        ArrowLeft: 'previous',
        ArrowRight: 'next',
      }[ event.key ];

      if (direction) {
        this[ `${ direction }Item` ]();
      }
    },
  },
};
</script>
