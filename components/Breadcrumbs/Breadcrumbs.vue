<template>
  <div class="breadcrumbs">
    <ul>
      <li>
        <NuxtLink to="/" class="breadcrumbs__item-link">Home</NuxtLink>
      </li>
      <li
        v-for="item in items"
        :key="item.slug"
      >
        <component
          :is="getTag(item.type)"
          :to="item.link || ''"
          :class="getClass(item.type)"
        >{{ item.label }}</component>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    baseUrl: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `//${this.baseUrl}/`
          }
        ]
      }
    }
  },
  head() {
    const itemList = this.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: item.label,
      item: `${this.prettyBaseUrl}${item.link}`
    }));

    return {
      script: [
        {
          type: 'application/ld+json',
          json: {
            ...this.structuredData,
            itemListElement: [
              ...this.structuredData.itemListElement,
              ...itemList
            ]
          }
        }
      ]
    };
  },
  computed: {
    prettyBaseUrl () {
      return `//${this.baseUrl}`;
    }
  },
  methods: {
    getClass (type) {
      return type === 'link' ? 'breadcrumbs__item-link' : 'breadcrumbs__item';
    },
    getTag (type) {
      return type === 'link' ? 'NuxtLink' : 'span';
    }
  }
})
</script>

<style lang="scss">
@import './Breadcrumbs.scss';
</style>
