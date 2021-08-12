<template>
  <div class="page__category">
    <p v-if="$fetchState.pending">Loading...</p>
    <ItemsGrid
      v-else
      :items="categoryItems"
      :route="$route"
      :route-resolver="$router.resolve"
      :total-pages="totalPages"
      :currency="currency"
      @click:add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ItemsGrid from '~/components/ItemsGrid/ItemsGrid.vue';

export default Vue.extend({
  components: { ItemsGrid },
  beforeRouteEnter(to, _, next) {
    return !to.params.slug ? next('/') : next();
  },
  scrollToTop: true,
  async fetch() {
    await this.fetchCategoryItems({
      categoryId: this.$route.params.slug,
      page: this.$route.query.p || 1
    });
  },
  computed: {
    ...mapGetters({
      categories: 'catalog/categories',
      pagesInCategory: 'catalog/pagesInCategory',
      currency: 'cart/currency'
    }),
    categoryItems () {
      const category = this.$route.params.slug;
      const page = parseInt(`${this.$route.query.p}`) || 1;

      if (!this.categories[category] || !this.categories[category].pages || !this.categories[category].pages[page]) {
        this.$fetch();
        return [];
      }

      return Object.keys(this.categories[category].pages[page]).map((key) =>
        this.categories[category].pages[page][key]);
    },
    totalPages () {
      return parseInt(this.pagesInCategory(this.$route.params.slug)) || 1;
    }
  },
  watch: {
    '$route.query.p' (page) {
      const category = this.$route.params.slug;
      if (!this.categories[category] || !this.categories[category].pages[page]) {
        this.$fetch();
      }
    }
  },
  methods: {
    ...mapActions({
      fetchCategoryItems: 'catalog/fetchCategoryItems',
      addCartItem: 'cart/addItem'
    }),
    handleAddToCart (payload) {
      this.addCartItem({
        sku: payload.id,
        price: payload.price,
        name: payload.name,
        image: payload.image,
        qty: 1
      });
    }
  }
})
</script>
