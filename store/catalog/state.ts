export interface CatalogState {
  categories: any;
  items: any;
}

export const state = (): CatalogState => ({
  categories: [],
  items: []
});

export default state;
