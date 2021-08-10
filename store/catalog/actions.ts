import { ActionTree } from 'vuex';
import { CatalogState } from '~/store/catalog/state';

export const actions: ActionTree<CatalogState, CatalogState> = {
  async fetchCategories ({ commit }) {
    const pageSize = 40;
    const url = `${this.app.$config.apiBaseUrl}/sets?pageSize=${pageSize}`;
    const result = await this.$axios.$get(url);
    const categories = result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        series: item.series,
        image: item.images.logo
      }
    }) || [];

    commit('SET_CATEGORIES', categories);
  },
  async fetchItems ({ commit }, category) {
    const pageSize = 20;
    const url = `${this.app.$config.apiBaseUrl}/cards?pageSize=${pageSize}&q=set.id:${category}`;
    const result = await this.$axios.$get(url);
    const items = result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        image: item.images.small,
        level: item.level,
        hp: item.hp
      };
    });

    commit('SET_ITEMS', { items, category });
  }
};

export default actions;
