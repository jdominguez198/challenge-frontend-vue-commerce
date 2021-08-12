<template>
  <div class="page__home">
    <p v-if="$fetchState.pending">Loading...</p>
    <div
      v-else-if="hasItems"
      class="page__home-items"
    >
      <NuxtLink
        v-for="item in listItems"
        :key="item.id"
        :to="`/category/${item.id}`"
        class="page__home-items-link"
      >
        <CategoryCard :title="item.name" :image="item.image" />
      </NuxtLink>
    </div>
    <div
      v-else
      class="page__home-empty"
      >
      <p>There are no categories or the data request has failed.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import CategoryCard from '~/components/CategoryCard/CategoryCard.vue'

export default Vue.extend({
  components: { CategoryCard },
  scrollToTop: true,
  async fetch() {
    await this.fetchCategories();
  },
  computed: {
    ...mapGetters({
      items: 'catalog/categories',
    }),
    listItems (): any {
      return this.items;
    },
    hasItems (): boolean {
      return this.items && Object.keys(this.items).length > 0;
    }
  },
  methods: {
    ...mapActions({
      fetchCategories: 'catalog/fetchCategories'
    })
  }
});
</script>
