export interface CatalogState {
  categories: any;
  items: any;
  itemsPerPage: number;
  lastSearch: any;
}

export const state = (): CatalogState => ({
  categories: {},
  items: {},
  itemsPerPage: 8,
  lastSearch: {}
});

export default state;
