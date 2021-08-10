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
        <span @click.prevent="handleAddToCart">Add to Cart</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
    }
  },
  methods: {
    handleAddToCart() {
      this.$emit('click:add-to-cart', { id: this.id });
    }
  }
});
</script>

<style lang="scss">
@import './ItemCard.scss';
</style>
