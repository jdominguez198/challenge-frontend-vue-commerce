<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__logo">
        <NuxtLink to="/" class="header__logo-item">
          <img src="/logo.png" :alt="title" :title="title" class="header__logo-image" />
        </NuxtLink>
      </div>
      <div class="header__search">
        <div class="header__search-input">
          <font-awesome-icon icon="search" class="header__search-input-icon" />
          <input
            type="text"
            name="search"
            :value="searchTerm"
            class="header__search-input-field"
            placeholder="Type your search..."
            @keyup="handleSearchTerm"
          />
        </div>
      </div>
      <div class="header__actions">
        <div class="header__actions-item" @click="handleCartToggle">
          <font-awesome-icon
            icon="shopping-cart"
            class="header__actions-item-icon"
          />
          <span class="header__actions-item-label">{{ cartBadge }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default Vue.extend({
  components: { FontAwesomeIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    searchTerm: {
      type: String,
      default: ''
    },
    cartTotalItems: {
      type: Number,
      required: true
    }
  },
  computed: {
    cartBadge () {
      return this.cartTotalItems > 0 ? `(${this.cartTotalItems})` : '';
    }
  },
  methods: {
    handleSearchTerm (event) {
      this.$emit('search:term-change', event.target.value);
    },
    handleCartToggle () {
      this.$emit('cart:toggle');
    }
  }
});
</script>

<style lang="scss">
@import './Header.scss';
</style>
