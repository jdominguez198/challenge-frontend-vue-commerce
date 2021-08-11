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
      categories: 'catalog/categories',
      sidebarCartOpen: 'ui/sidebarCartOpen',
      cartItems: 'cart/items',
      cartSubtotal: 'cart/subtotal',
      cartTaxes: 'cart/taxes',
      cartTotal: 'cart/total',
      cartCurrency: 'cart/currency'
    }),
    items () {
      return this.cartItems.map((item: any) => {
        const found = Object.keys(this.categories).reduce((output: any, category: any) => {
          const inPage = Object.keys(this.categories[category].pages).find((page: string) => {
            return this.categories[category].pages[page][item.id]
          });

          return inPage && this.categories[category].pages[inPage][item.id] || output;
        }, null)

        return {
          ...item,
          ...(found && found.name && {
            name: found.name,
            image: found.image
          })
        }
      });
    }
  }),
  methods: {
    ...mapActions({
      toggleCart: 'ui/toggleSidebarCart',
      closeCart: 'ui/closeSidebarCart',
      findItem: 'catalog/findItem'
    })
  }
}
</script>
