<template>
  <div class="item-card">
    <div class="item-card__wrapper">
      <div class="item-card__image">
        <img :src="image" :alt="name" :title="name" />
      </div>
      <div class="item-card__content">
        <h3 class="item-card__content-title">{{ name }}</h3>
        <span class="item-card__content-line"><strong>Level:</strong>{{ level }}</span>
        <span class="item-card__content-line"><strong>HP:</strong>{{ hp }}</span>
        <span class="item-card__content-line"><strong>Price:</strong>{{ price }} {{ currency }}</span>
      </div>
      <div class="item-card__add-to-cart" @click.prevent="handleAddToCart">
        <span>{{ addToCartNotification.source }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { notifyAddedToCart } from '~/utils/notifyAddedToCart';

export default Vue.extend({
  props: {
    id: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      default: null
    },
    hp: {
      type: String,
      default: null
    },
    price: {
      type: Number,
      default: null
    },
    currency: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      addToCartNotification: {
        timer: null,
        defaultText: 'Add to Cart',
        addedText: 'Added!',
        source: 'Add to Cart',
        isAdding: false
      }
    }
  },
  methods: {
    handleAddToCart() {
      if (this.addToCartNotification.isAdding) {
        return;
      }

      notifyAddedToCart(this.addToCartNotification);

      this.$emit('click:add-to-cart', {
        id: this.id,
        image: this.image,
        name: this.name,
        price: this.price
      });
    }
  }
});
</script>

<style lang="scss">
@import './ItemCard.scss';
</style>
