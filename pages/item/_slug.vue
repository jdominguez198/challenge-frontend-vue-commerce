<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <div
    v-else
    class="page__item"
  >
    <ItemDetail
      :sku="itemDetails.id"
      :name="itemDetails.name"
      :price="itemDetails.price"
      :currency="currency"
      :image="itemDetails.largeImage"
      :category-id="itemDetails.category && itemDetails.category.id"
      :category-name="itemDetails.category && itemDetails.category.name"
      :level="itemDetails.level"
      :attacks="itemDetails.attacks"
      :weaknesses="itemDetails.weaknesses"
      :hp="itemDetails.hp"
      @click:add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ItemDetail from '~/components/ItemDetail/ItemDetail.vue';

export default Vue.extend({
  components: { ItemDetail },
  beforeRouteEnter(to, _, next) {
    return !to.params.slug ? next('/') : next();
  },
  scrollToTop: true,
  async fetch() {
    await this.fetchItemDetails(this.$route.params.slug);
  },
  computed: {
    ...mapGetters({
      items: 'catalog/items',
      currency: 'cart/currency'
    }),
    itemDetails () {
      const id = this.$route.params.slug;

      return this.items[id] || {};
    }
  },
  methods: {
    ...mapActions({
      fetchItemDetails: 'catalog/fetchItemDetails',
      addCartItem: 'cart/addItem'
    }),
    handleAddToCart () {
      this.addCartItem({
        sku: this.itemDetails.id,
        price: this.itemDetails.price,
        name: this.itemDetails.name,
        image: this.itemDetails.image,
        qty: 1
      });
    }
  }
})
</script>
