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
  async fetchCategoryItems ({ state, commit }, { categoryId, page = 1}) {
    const pageSize = state.itemsPerPage;
    const url = `${this.app.$config.apiBaseUrl}/cards?pageSize=${pageSize}&page=${page}&q=set.id:${categoryId}`;
    const result = await this.$axios.$get(url);
    const items = result.data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        category: {
          id: item.set.id,
          name: item.set.name
        },
        image: item.images.small,
        level: item.level,
        hp: item.hp,
        price: item.cardmarket.prices.trendPrice || 9999.99
      };
    });
    const { page: currentPage, totalCount } = result;

    commit('SET_CATEGORY_ITEMS', { items, categoryId, page: currentPage, totalCount });
  },
  async fetchItemDetails ({ commit }, itemId: string) {
    const url = `${this.app.$config.apiBaseUrl}/cards/${itemId}`;
    const result = await this.$axios.$get(url);
    const item = {
      id: result.data.id,
      name: result.data.name,
      hp: result.data.hp,
      types: result.data.types,
      evolvesTo: result.data.evolvesTo,
      attacks: result.data.attacks,
      weaknesses: result.data.weaknesses,
      set: result.data.set,
      images: result.data.images,
      price: result.data.cardmarket.prices.trendPrice || 9999.99
    };

    commit('SET_ITEM', item);
  }
};

export default actions;
