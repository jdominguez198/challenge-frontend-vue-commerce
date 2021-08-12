<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <div v-else>
    <Breadcrumbs :items="breadcrumbs" :base-url="baseUrl" />
    <div class="page__item">
      <ItemDetail
        :base-url="baseUrl"
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
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import ItemDetail from '~/components/ItemDetail/ItemDetail.vue';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs.vue';

export default Vue.extend({
  components: { Breadcrumbs, ItemDetail },
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
    },
    breadcrumbs () {
      if (!this.itemDetails || !this.itemDetails.category) {
        return;
      }

      return [
        {
          type: 'link',
          link: `/category/${this.itemDetails.category.id}`,
          label: this.itemDetails.category.name
        },
        {
          type: 'text',
          label: this.itemDetails.name,
          link: this.$route.fullPath
        }
      ];
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
