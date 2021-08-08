<template>
  <div class="page page__home">
    <CategoryCard
      v-for="category in categories"
      :key="category.id"
      :title="category.name"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CategoryCard from '~/components/CategoryCard/CategoryCard.vue'

export default Vue.extend({
  components: { CategoryCard },
  data () {
    return {
      categories: []
    }
  },
  async mounted() {
    const { genres } = await this.$axios.$get(`${this.$config.apiBaseUrl}genre/movie/list`);
    this.categories = genres && [ ...genres ] || [];
  }
});
</script>
