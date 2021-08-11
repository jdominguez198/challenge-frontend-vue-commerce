export interface CartState {
  items: any;
  tax: number;
  currency: string;
}

export const state = (): CartState => ({
  items: [],
  tax: 0.21,
  currency: '€'
});

export default state;
