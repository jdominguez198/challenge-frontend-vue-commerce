<template>
  <div class="page__category">
    <p v-if="$fetchState.pending">Loading...</p>
    <div v-else>
      <Breadcrumbs :items="breadcrumbs" :base-url="baseUrl" />
      <ItemsGrid
        :items="categoryItems"
        :route="$route"
        :route-resolver="$router.resolve"
        :total-pages="totalPages"
        :currency="currency"
        @click:add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ItemsGrid from '~/components/ItemsGrid/ItemsGrid.vue';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs.vue';

export default Vue.extend({
  components: { Breadcrumbs, ItemsGrid },
  beforeRouteEnter(to, _, next) {
    return !to.params.slug ? next('/') : next();
  },
  scrollToTop: true,
  asyncData(ctx) {
    return {
      baseUrl: process.browser && window.location.host || ctx.req && ctx.req.headers.host
    }
  },
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
    },
    breadcrumbs () {
      const category = this.$route.params.slug;
      let categoryName = this.categories[category] && this.categories[category].name || null;

      if (!categoryName) {
        const page = parseInt(`${this.$route.query.p}`) || 1;
        if (this.categories[category] && this.categories[category].pages && this.categories[category].pages[page]) {
          const itemKeys = Object.keys(this.categories[category].pages[page]);
          const firstItem = this.categories[category].pages[page][itemKeys[0]];
          categoryName = firstItem && firstItem.category && firstItem.category.name || null;
        }
      }

      return [
        {
          type: 'text',
          label: categoryName || 'Unknown',
          link: this.$route.fullPath
        }
      ];
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
