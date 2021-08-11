export interface CatalogState {
  categories: any;
  items: any;
  itemsPerPage: number;
}

export const state = (): CatalogState => ({
  categories: {},
  items: {},
  itemsPerPage: 2
});

export default state;
