<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <div
    v-else
    class="page__item"
  >
    <p>{{ itemDetails.name }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  beforeRouteEnter(to, _, next) {
    if (!to.params.slug) {
      return next('/');
    }

    return next();
  },
  async fetch() {
    // (this as any) workaround: https://github.com/vuejs/vue/issues/8721
    await (this as any).fetchItemDetails(this.$route.params.slug);
  },
  computed: {
    ...mapGetters({
      items: 'catalog/items'
    }),
    itemDetails () {
      const id = this.$route.params.slug;

      return this.items[id] || {};
    }
  },
  methods: {
    ...mapActions({
      fetchItemDetails: 'catalog/fetchItemDetails',
    }),
  }
})
</script>
