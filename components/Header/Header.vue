<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__navigation">
        <ul>
          <li
            v-for="navigationItem in navigationItems"
            :key="navigationItem.slug"
          >
            <NuxtLink
              :to="navigationItem.link"
              class="header__navigation-item"
            >{{navigationItem.label}}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="header__actions">
        <ul>
          <li
            v-for="actionItem in actionItems"
            :key="actionItem.slug"
          >
            <font-awesome-icon :icon="actionItem.icon" class="header__actions-item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    navigationItems: {
      type: Array,
      required: true
    },
    actionItems: {
      type: Array,
      required: true
    }
  }
});
</script>

<style lang="scss">
@import './Header.scss';
</style>
