<template>
  <div class="page__search">
    <p v-if="$fetchState.pending">Loading...</p>
    <ItemsGrid
      v-else
      :items="lastSearchItems"
      :route="$route"
      :route-resolver="$router.resolve"
      :total-pages="totalPages"
      @click:add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex'
import ItemsGrid from '~/components/ItemsGrid/ItemsGrid.vue';

export default Vue.extend({
  components: { ItemsGrid },
  beforeRouteEnter(to, _, next) {
    if (!to.query.q || to.query.p === '') {
      return next('/');
    }

    return next();
  },
  scrollToTop: true,
  async fetch() {
    if (!this.$route.query.q) {
      return;
    }

    // (this as any) workaround: https://github.com/vuejs/vue/issues/8721
    await this.searchItems({
      term: this.$route.query.q,
      page: this.$route.query.p || 1
    });
  },
  computed: {
    ...mapGetters({
      lastSearchItems: 'catalog/lastSearchItems',
      lastSearchPages: 'catalog/pagesInLastSearch'
    }),
    totalPages () {
      return parseInt(this.lastSearchPages);
    }
  },
  watch: {
    '$route' (route) {
      if (route.path === '/search') {
        if (route.query.q && route.query.q.length > 0) {
          this.$fetch();
          return;
        }

        this.$router.push('/');
      }
    }
  },
  methods: {
    ...mapActions({
      searchItems: 'catalog/searchItemsByTerm',
      addCartItem: 'cart/addItem'
    }),
    handleAddToCart (payload) {
      this.addCartItem({
        itemId: payload.id,
        price: payload.price,
        name: payload.name,
        image: payload.image,
        qty: 1
      });
    }
  }
})
</script>
