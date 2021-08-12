export const storeInLocalStorage = ({ store }: any) => {
  store.subscribe((mutation: any, state: any) => {
    if (process.server || !localStorage) {
      return;
    }

    if (mutation.type.startsWith('cart/')) {
      localStorage.setItem('cart_state', JSON.stringify(state.cart));
      if (!state.cart.stored) {
        store.dispatch('cart/setStored');
      }
    }
  });

  store.dispatch('cart/initializeStore');
}

export default storeInLocalStorage;
