import mutations from '~/store/catalog/mutations';
import { CatalogState } from '~/store/catalog/state';

describe('CatalogState', () => {
  test('should add categories to the catalog store', () => {
    const state: CatalogState = {
      categories: [],
      items: [],
      itemsPerPage: 10,
      lastSearch: {}
    };
    const categories = [
      {
        id: 'test'
      }
    ];
    mutations.SET_CATEGORIES(state, categories);
    expect(state.categories).toHaveProperty('test');
    expect(Object.keys(state.categories)).toHaveLength(1)
  });

  test('should add items to a category', () => {
    const state: CatalogState = {
      categories: [],
      items: [],
      itemsPerPage: 10,
      lastSearch: {}
    };
    const items = [
      {
        id: 'test'
      }
    ];
    mutations.SET_CATEGORY_ITEMS(state, {
      items,
      categoryId: 'category-test',
      page: 1,
      totalCount: items.length
    });
    expect(state.categories).toHaveProperty('category-test');
    expect(state.categories['category-test'].pages[1]).toHaveProperty('test');
    expect(Object.keys(state.categories['category-test'].pages[1])).toHaveLength(1)
  });
});
