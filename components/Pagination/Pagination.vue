<template>
  <div class="pagination">
    <div class="pagination__wrapper">
      <div class="pagination__items">
        <ul>
          <li>
            <NuxtLink
              :to="firstPage"
              :disabled="currentPage === 1"
              class="pagination__item"
            >&lt;&lt;</NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="previousPage"
              :disabled="currentPage === 1"
              class="pagination__item"
            >&lt;</NuxtLink>
          </li>
          <li class="pagination__item">{{ currentPage }} / {{ totalPages }}</li>
          <li>
            <NuxtLink
              :to="nextPage"
              :disabled="currentPage === totalPages"
              class="pagination__item"
            >&gt;</NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="lastPage"
              :disabled="currentPage === totalPages"
              class="pagination__item"
            >&gt;&gt;</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: {
    firstPage: {
      type: String,
      required: true
    },
    nextPage: {
      type: String,
      required: true
    },
    previousPage: {
      type: String,
      required: true
    },
    lastPage: {
      type: String,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  }
})
</script>

<style lang="scss">
@import './Pagination.scss';
</style>
