<template>
  <div class="page__category">
    <p v-if="$fetchState.pending">Loading...</p>
    <div
      v-else
      class="page__category-items"
    >
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
          :level="item.level"
          :hp="item.hp"
          @click:add-to-cart="handleAddToCart"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import ItemCard from '~/components/ItemCard/ItemCard.vue'

export default Vue.extend({
  components: { ItemCard },
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
    await this.fetchItems(this.$route.params.slug);
  },
  computed: {
    categoryItems () {
      return this.$store.getters['catalog/items'][this.$route.params.slug] || [];
    }
  },
  methods: {
    ...mapActions({
      fetchItems: 'catalog/fetchItems'
    }),
    handleAddToCart (payload: any) {
      console.log('ADD_TO_CART: ', payload);
    }
  }
})
</script>
