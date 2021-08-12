<template>
  <div class="items-grid">
    <div
      v-if="items.length > 0"
      class="items-grid__wrapper"
    >
      <div class="items-grid__list">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="`/item/${item.id}`"
          class="items-grid__list-link"
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
        class="items-grid__list-pagination"
        :current-page="currentPage"
        :total-pages="totalPages"
        :first-page="getPage('first')"
        :previous-page="getPage('previous')"
        :next-page="getPage('next')"
        :last-page="getPage('last')"
      />
    </div>
    <div
      v-else
      class="items-grid__list-empty"
    >
      <p>There are no items with the requested search term.</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Pagination from '~/components/Pagination/Pagination.vue';
import ItemCard from '~/components/ItemCard/ItemCard.vue';

export default Vue.extend({
  components: { Pagination, ItemCard },
  props: {
    items: {
      type: Array,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    routeResolver: {
      type: Function,
      required: true
    }
  },
  computed: {
    currentPage () {
      return parseInt(this.route.query.p) || 1;
    }
  },
  methods: {
    getPage (page) {
      const newRoute = { ...this.route };
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

      const resolved = this.routeResolver(newRoute);
      const { href } = resolved;

      // Reset router to avoid issues with keep-alive
      newRoute.query.p = keepCurrentPage;
      this.routeResolver(newRoute);

      return href;
    },
    handleAddToCart (payload) {
      this.$emit('click:add-to-cart', payload);
    }
  }
})
</script>

<style lang="scss">
@import './ItemsGrid.scss';
</style>
