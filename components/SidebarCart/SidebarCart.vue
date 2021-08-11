<template>
  <div class="sidebar-cart" :class="{ 'sidebar-cart--open': open }">
    <div class="sidebar-cart__wrapper">
      <div class="sidebar-cart__header">
        <h2 class="sidebar-cart__title">Cart</h2>
        <font-awesome-icon
          class="sidebar-cart__close"
          :icon="[ 'far', 'times-circle' ]"
          @click="closeHandler"
        />
      </div>
      <div
        class="sidebar-cart__content"
        :class="{ 'sidebar-cart__content--empty': isEmpty }"
      >
        <div
          v-if="!isEmpty"
          class="sidebar-cart__content-wrapper"
        >
          <div class="sidebar-cart__items">
            <CartItem
              v-for="item in items"
              :key="item.id"
              :sku="item.id"
              :name="item.name"
              :price="item.price"
              :qty="item.qty"
              :image="item.image"
              :currency="currency"
            />
          </div>
          <div class="sidebar-cart__totals">
            <div class="sidebar-cart__totals-line">
              <span class="sidebar-cart__totals-title">Subtotal:</span>
              <span class="sidebar-cart__totals-value">{{ subtotal.toFixed(2) }} {{ currency }}</span>
            </div>
            <div class="sidebar-cart__totals-line">
              <span class="sidebar-cart__totals-title">Taxes:</span>
              <span class="sidebar-cart__totals-value">{{ taxes.toFixed(2) }} {{ currency }}</span>
            </div>
            <div class="sidebar-cart__totals-line">
              <span class="sidebar-cart__totals-title">Total:</span>
              <span class="sidebar-cart__totals-value">{{ total.toFixed(2) }} {{ currency }}</span>
            </div>
          </div>
        </div>
        <div
          v-else
          class="sidebar-cart__empty"
        >
          <p>There is no products at this moment!</p>
          <NuxtLink :to="featuredLink"><button>Check our Featured products</button></NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CartItem from '~/components/CartItem/CartItem.vue'

export default Vue.extend({
  components: { CartItem },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    closeHandler: {
      type: Function,
      default: null
    },
    items: {
      type: Array,
      default: () => ([])
    },
    subtotal: {
      type: Number,
      default: 0.0
    },
    taxes: {
      type: Number,
      default: 0.0
    },
    total: {
      type: Number,
      default: 0.0
    },
    currency: {
      type: String,
      default: ''
    },
    featuredLink: {
      type: String,
      default: ''
    }
  },
  computed: {
    cartItems () {
      return this.items;
    },
    isEmpty () {
      return !this.items || !this.items.length || this.items.length === 0;
    }
  }
});
</script>

<style lang="scss">
@import './SidebarCart.scss';
</style>
