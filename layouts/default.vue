<template>
  <div class="app-layout" :class="{ 'app-layout--sidebar-open': sidebarCartOpen }">
    <Header
      :navigation-items="navigationItems"
      :action-items="actionItems"
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
    />
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import Header from '~/components/Header/Header.vue';
import SidebarCart from '~/components/SidebarCart/SidebarCart.vue';

export default {
  components: { SidebarCart, Header },
  data () {
    return {
      navigationItems: [
        {
          slug: 'home',
          link: '/',
          label: 'Home'
        }
      ],
      actionItems: [
        {
          slug: 'search',
          icon: 'search',
          action: () => null
        },
        {
          slug: 'cart',
          icon: 'shopping-cart',
          action: () => this.toggleCart()
        },
      ],
    }
  },
  computed: ({
    ...mapGetters({
      sidebarCartOpen: 'ui/sidebarCartOpen',
      cartItems: 'cart/items',
      cartSubtotal: 'cart/subtotal',
      cartTaxes: 'cart/taxes',
      cartTotal: 'cart/total',
      cartCurrency: 'cart/currency'
    })
  }),
  methods: {
    ...mapActions({
      toggleCart: 'ui/toggleSidebarCart',
      closeCart: 'ui/closeSidebarCart'
    })
  }
}
</script>
