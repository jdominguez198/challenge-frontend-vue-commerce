<template>
  <div v-if="sku.length > 0" class="item-detail">
    <div class="item-detail__wrapper">
      <div class="item-detail__image">
        <img :src="image" :alt="name" :title="name" />
      </div>
      <div class="item-detail__description">
        <h1 class="item-detail__description-title">{{ name }}</h1>
        <div
          v-for="(descriptionItem, index) in descriptionItems"
          :key="`${sku}-description-${index}`"
          class="item-detail__description-line"
        >
          <span class="item-detail__description-line-title">{{ descriptionItem.label }}:</span>
          <span class="item-detail__description-line-value">{{ descriptionItem.value }}</span>
        </div>
      </div>
      <div class="item-detail__attacks">
        <h2 class="item-detail__attacks-title">Attacks:</h2>
        <div
          v-for="(attack, index) in attacks"
          :key="`${sku}-attack-${index}`"
          class="item-detail__attacks-line"
        >
          <span class="item-detail__attacks-line-title">{{ attack.name }}:</span>
          <span class="item-detail__attacks-line-value">{{ attack.text }}</span>
        </div>
      </div>
      <div class="item-detail__weaknesses">
        <h2 class="item-detail__weaknesses-title">Weaknesses:</h2>
        <div
          v-for="(weakness, index) in weaknesses"
          :key="`${sku}-weakness-${index}`"
          class="item-detail__weaknesses-line"
        >
          <span class="item-detail__weaknesses-line-title">{{ weakness.type }}:</span>
          <span class="item-detail__weaknesses-line-value">{{ weakness.value }}</span>
        </div>
      </div>
      <div class="item-detail__add-to-cart" @click="handleAddToCart">
        <span class="item-detail__add-to-cart-title">{{ addToCartNotification.source }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { notifyAddedToCart } from '~/utils/notifyAddedToCart';

export default Vue.extend({
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    sku: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    categoryId: {
      type: String,
      default: ''
    },
    categoryName: {
      type: String,
      default: ''
    },
    hp: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      default: ''
    },
    attacks: {
      type: Array,
      default: () => ([])
    },
    weaknesses: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    return {
      addToCartNotification: {
        timer: null,
        defaultText: 'Add to Cart',
        addedText: 'Added!',
        source: 'Add to Cart',
        isAdding: false
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: this.name,
        image: this.image,
        sku: this.sku,
        description: this.name,
        category: [ this.categoryName ],
        itemCondition: 'https://schema.org/NewCondition',
        offers: {
          '@type': 'Offer',
          category: [ this.categoryName ],
          priceCurrency: this.currency,
          price: this.price,
          priceValidUntil: tomorrow.toISOString(),
          itemCondition: 'https://schema.org/NewCondition',
          availability: 'inStock',
          sku: this.sku
        }
      }
    }
  },
  head() {
    return {
      script: [
        {
          type: 'application/ld+json',
          json: { ...this.structuredData }
        }
      ]
    };
  },
  computed: {
    descriptionItems () {
      return [
        {
          label: 'SKU',
          value: this.sku
        },
        {
          label: 'Category',
          value: this.categoryName
        },
        {
          label: 'Level',
          value: this.level
        },
        {
          label: 'HP',
          value: this.hp
        },
        {
          label: 'Price',
          value: `${this.price} ${this.currency}`
        }
      ]
    }
  },
  methods: {
    handleAddToCart () {
      if (this.addToCartNotification.isAdding) {
        return;
      }

      notifyAddedToCart(this.addToCartNotification);
      this.$emit('click:add-to-cart');
    }
  }
});
</script>

<style lang="scss">
@import './ItemDetail.scss';
</style>
