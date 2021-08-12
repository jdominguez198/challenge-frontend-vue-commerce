import { GetterTree } from 'vuex';
import { CartState } from '~/store/cart/state';

const getPriceTax = ((qty: number, price: number, tax: number) => qty * price * tax);

export const getters: GetterTree<CartState, CartState> = {
  items: (state: CartState) => state.items,
  totalItems: (state: CartState) =>
    state.items.reduce((accum: number, item: any) => accum + item.qty, 0),
  subtotal: (state: CartState) =>
    state.items.reduce((accum: number, item: any) =>
      accum + item.qty * item.price, 0.0),
  taxes: (state: CartState) =>
    state.items.reduce((accum: number, item: any) =>
      accum + getPriceTax(item.qty, item.price, state.tax), 0.0),
  total: (state: CartState) =>
    state.items.reduce((accum: number, item: any) =>
      accum + item.qty * item.price + getPriceTax(item.qty, item.price, state.tax), 0.00),
  currency: (state: CartState) => state.currency,
  tax: (state: CartState) => state.tax
};

export default getters;
