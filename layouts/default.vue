<template>
  <div class="app-layout">
    <Header
      :navigation-items="navigationItems"
      :action-items="actionItems"
    />
    <div class="page">
      <div class="page__wrapper">
        <Nuxt keep-alive :keep-alive-props="{ max: 10 }"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '~/components/Header/Header.vue'
export default {
  components: { Header },
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
          icon: 'search'
        },
        {
          slug: 'cart',
          icon: 'shopping-cart'
        },
      ],
    }
  }
}
</script>
