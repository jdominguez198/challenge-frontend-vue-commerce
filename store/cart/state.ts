export interface CartState {
  stored: boolean;
  items: any;
  tax: number;
  currency: string;
}

export const state = (): CartState => ({
  stored: false,
  items: [],
  tax: 0.21,
  currency: '€'
});

export default state;
