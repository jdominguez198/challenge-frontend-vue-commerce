<template>
  <div class="item-card">
    <div class="item-card__wrapper">
      <div class="item-card__image">
        <img :src="image" :alt="name" :title="name" />
      </div>
      <div class="item-card__content">
        <h3 class="item-card__title">{{ name }}</h3>
        <span><strong>Level:</strong>{{ level }}</span>
        <span><strong>HP:</strong>{{ hp }}</span>
      </div>
      <div class="item-card__add-to-cart">
        <span @click.prevent="handleAddToCart">{{ addToCartText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

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
    }
  },
  data () {
    return {
      timerAddToCartText: undefined,
      defaultAddToCartText: 'Add to Cart',
      addedAddToCartText: 'Added!',
      addToCartText: 'Add to Cart',
      addingToCart: false
    }
  },
  methods: {
    notifyAddedToCart() {
      if (this.timerAddToCartText) {
        clearTimeout(this.timerAddToCartText);
      }

      this.addToCartText = this.addedAddToCartText;
      this.addingToCart = true;
      this.timerAddToCartText = setTimeout(() => {
        this.addToCartText = this.defaultAddToCartText;
        this.addingToCart = false;
      }, 1000);
    },
    handleAddToCart() {
      if (this.addingToCart) {
        return;
      }

      this.notifyAddedToCart();

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
