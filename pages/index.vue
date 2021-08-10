<template>
  <div class="page__home">
    <p v-if="$fetchState.pending">Loading...</p>
    <div
      v-else
      class="page__home-items"
    >
      <NuxtLink
        v-for="item in items"
        :key="item.id"
        :to="`/category/${item.id}`"
        class="page__home-items-link"
      >
        <CategoryCard :title="item.name" :image="item.image" />
      </NuxtLink>
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
  data () {
    return {
    }
  },
  async fetch() {
    await this.fetchCategories();
  },
  computed: {
    ...mapGetters({
      items: 'catalog/categories',
    })
  },
  methods: {
    ...mapActions({
      fetchCategories: 'catalog/fetchCategories'
    })
  }
});
</script>
