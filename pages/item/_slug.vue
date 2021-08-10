<template>
  <div class="page__item">
    <p>Item page</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  beforeRouteEnter(to, _, next) {
    if (!to.params.slug) {
      return next('/');
    }

    return next();
  }
})
</script>
