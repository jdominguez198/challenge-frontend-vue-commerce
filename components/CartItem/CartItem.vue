<template>
  <div class="cart-item">
    <div class="cart-item__wrapper">
      <div class="cart-item__image">
        <img :src="image" :alt="name" :title="name" />
      </div>
      <div class="cart-item__description">
        <span class="cart-item__description-name">{{ name }}</span>
        <span class="cart-item__description-sku">SKU: {{ sku }}</span>
      </div>
      <div class="cart-item__price">{{ price }} {{ currency}}</div>
      <div class="cart-item__quantity">
        <button class="cart-item__quantity-minus" @click="handleDecreaseQty">-</button>
        <input readonly :value="qty" class="cart-item__quantity-value"/>
        <button class="cart-item__quantity-plus" @click="handleIncreaseQty">+</button>
      </div>
      <div class="cart-item__remove">
        <font-awesome-icon :icon="[ 'far', 'trash-alt' ]" @click="handleRemoveFromCart" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    sku: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleDecreaseQty () {
      this.$emit('cart:decrease-qty', { sku: this.sku, currentQty: this.qty })
    },
    handleIncreaseQty () {
      this.$emit('cart:increase-qty', { sku: this.sku, currentQty: this.qty })
    },
    handleRemoveFromCart () {
      this.$emit('cart:remove', this.sku);
    }
  }
})
</script>

<style lang="scss">
@import './CartItem.scss';
</style>
