<template>
  <div class="app-layout">
    <Header
      title="Challenge Commerce"
      :search-term="searchTerm"
      :cart-total-items="cartTotalItems"
      @search:term-change="handleSearch"
      @cart:toggle="toggleCart"
    />
    <div class="page">
      <div class="page__wrapper">
        <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
      </div>
    </div>
    <SidebarCart
      class="page__sidebar"
      :items="cartItems"
      :open="sidebarCartOpen"
      :subtotal="cartSubtotal"
      :taxes="cartTaxes"
      :total="cartTotal"
      :currency="cartCurrency"
      :close-handler="closeCart"
      featured-link="/"
      @cart:decrease-qty="handleCartDecreaseQty"
      @cart:increase-qty="handleCartIncreaseQty"
      @cart:remove="handleRemoveItem"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Header from '~/components/Header/Header.vue';
import SidebarCart from '~/components/SidebarCart/SidebarCart.vue';
import storeInLocalStorage from '~/utils/storeInLocalStorage';

export default Vue.extend({
  components: { SidebarCart, Header },
  data () {
    return {
      searchTermBouncer: null,
      navigationItems: [
        {
          slug: 'home',
          link: '/',
          label: 'Home'
        }
      ]
    }
  },
  computed: ({
    ...mapGetters({
      sidebarCartOpen: 'ui/sidebarCartOpen',
      cartItems: 'cart/items',
      cartTotalItems: 'cart/totalItems',
      cartSubtotal: 'cart/subtotal',
      cartTaxes: 'cart/taxes',
      cartTotal: 'cart/total',
      cartCurrency: 'cart/currency'
    }),
    searchTerm () {
      return this.$route.path === '/search' && this.$route.query.q || '';
    }
  }),
  beforeCreate() {
    if (this.$isServer) {
      return;
    }
    storeInLocalStorage({ store: this.$store });
  },
  methods: {
    ...mapActions({
      toggleCart: 'ui/toggleSidebarCart',
      closeCart: 'ui/closeSidebarCart',
      setCartItemQty: 'cart/setItemQty',
      removeCartItem: 'cart/removeItem'
    }),
    handleSearch (value) {
      if (this.searchTermBouncer) {
        clearTimeout(this.searchTermBouncer);
      }
      this.searchTermBouncer = setTimeout(() => {
        this.$router.push(`/search?q=${value}`)
      }, 500);
    },
    handleCartDecreaseQty ({ sku, currentQty }) {
      if (currentQty === 1) {
        return;
      }
      this.setCartItemQty({ itemId: sku, qty: --currentQty})
    },
    handleCartIncreaseQty ({ sku, currentQty }) {
      if (currentQty === 99) {
        return;
      }
      this.setCartItemQty({ itemId: sku, qty: ++currentQty})
    },
    handleRemoveItem (sku) {
      this.removeCartItem(sku);
    }
  }
});
</script>
