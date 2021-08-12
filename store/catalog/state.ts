export interface CatalogState {
  categories: any;
  items: any;
  itemsPerPage: number;
  lastSearch: any;
}

export const state = (): CatalogState => ({
  categories: {},
  items: {},
  itemsPerPage: 2,
  lastSearch: {}
});

export default state;
