<template>
  <div class="page__category">
    <p v-if="$fetchState.pending">Loading...</p>
    <div v-else>
      <div class="page__category-items">
        <NuxtLink
          v-for="item in categoryItems"
          :key="item.id"
          :to="`/item/${item.id}`"
          class="page__category-items-link"
          >
          <ItemCard
            :id="item.id"
            :name="item.name"
            :image="item.image"
            :price="item.price"
            :level="item.level"
            :hp="item.hp"
            @click:add-to-cart="handleAddToCart"
          />
        </NuxtLink>
      </div>
      <Pagination
        class="page__category-items-pagination"
        :current-page="currentPage"
        :total-pages="totalPages"
        :first-page="getPage('first')"
        :previous-page="getPage('previous')"
        :next-page="getPage('next')"
        :last-page="getPage('last')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ItemCard from '~/components/ItemCard/ItemCard.vue'
import Pagination from '~/components/Pagination/Pagination.vue'

export default Vue.extend({
  components: { Pagination, ItemCard },
  beforeRouteEnter(to, _, next) {
    if (!to.params.slug) {
      return next('/');
    }

    return next();
  },
  data () {
    return {
    }
  },
  async fetch() {
    // (this as any) workaround: https://github.com/vuejs/vue/issues/8721
    await (this as any).fetchCategoryItems({
      categoryId: this.$route.params.slug,
      page: this.$route.query.p || 1
    });
  },
  computed: {
    ...mapGetters({
      categories: 'catalog/categories',
      pagesInCategory: 'catalog/pagesInCategory'
    }),
    categoryItems () {
      const category = this.$route.params.slug;
      const page = this.$route.query.p || 1;

      if (!this.categories[category] || !this.categories[category].pages) {
        return [];
      }

      return Object.keys(this.categories[category].pages[page]).map((key: string) =>
        this.categories[category].pages[page][key]);
    },
    currentPage () {
      return parseInt(this.$route.query.p) || 1;
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
    handleAddToCart (payload: any) {
      this.addCartItem({
        itemId: payload.id,
        price: payload.price,
        name: payload.name,
        image: payload.image,
        qty: 1
      });
    },
    getPage (page: string) {
      const newRoute = { ...this.$route };
      const keepCurrentPage = this.currentPage;

      switch (page) {
        case 'first':
          newRoute.query.p = 1;
          break;
        case 'previous':
          newRoute.query.p = this.currentPage === 1 ? 1 : this.currentPage - 1;
          break;
        case 'next':
          newRoute.query.p = this.currentPage < this.totalPages ? this.currentPage + 1 : this.totalPages;
          break;
        case 'last':
          newRoute.query.p = this.totalPages;
          break;
      }

      const resolved = this.$router.resolve(newRoute);
      const { href } = resolved;

      // Reset router to avoid issues with keep-alive
      newRoute.query.p = keepCurrentPage;
      this.$router.resolve(newRoute);

      return href;
    }
  }
})
</script>
