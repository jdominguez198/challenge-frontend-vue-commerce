import mutations from '~/store/cart/mutations';
import { CartState } from '~/store/cart/state';

describe('CartState', () => {
  test('should add items into cart', () => {
    const state: CartState = {
      stored: false,
      tax: 0,
      currency: 'test',
      items: []
    };
    mutations.ADD_ITEM(state, {});
    expect(state.items).toHaveLength(1);
  });

  test('should add quantity from an already added item in cart', () => {
    const state: CartState = {
      stored: false,
      tax: 0,
      currency: 'test',
      items: [
        {
          id: 'test',
          name: 'test',
          image: '',
          qty: 1,
          price: 100
        }
      ]
    };
    mutations.ADD_ITEM(state, {
      sku: 'test',
      qty: 10
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toEqual(11);
  });

  test('should set quantity from an already added item in cart', () => {
    const state: CartState = {
      stored: false,
      tax: 0,
      currency: 'test',
      items: [
        {
          id: 'test',
          name: 'test',
          image: '',
          qty: 10,
          price: 100
        }
      ]
    };
    mutations.SET_ITEM_QTY(state, {
      itemId: 'test',
      qty: 20
    });
    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toEqual(20);
  });

  test('should set quantity from an already added item in cart', () => {
    const state: CartState = {
      stored: false,
      tax: 0,
      currency: 'test',
      items: [
        {
          id: 'test',
          name: 'test',
          image: '',
          qty: 1,
          price: 1
        },
        {
          id: 'remove',
          name: 'remove',
          image: '',
          qty: 1,
          price: 1
        }
      ]
    };
    mutations.REMOVE_ITEM(state, 'remove');
    expect(state.items).toHaveLength(1);
  });
});
