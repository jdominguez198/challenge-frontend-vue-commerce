<template>
  <div class="category-card">
    <div class="category-card__wrapper">
      <div class="category-card__image">
        <img :src="image" :alt="title" :title="title" />
      </div>
      <div class="category-card__content">
        <h3 class="category-card__title">{{ title }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss">
@import './CategoryCard.scss';
</style>
