<template>
  <div class="category-card">
    <h3 class="category-card__title">{{ title }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    }
  }
});
</script>
