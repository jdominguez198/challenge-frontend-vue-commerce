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
      <div class="cart-item__quantity">{{ qty }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
  }
})
</script>

<style lang="scss">
@import './CartItem.scss';
</style>
