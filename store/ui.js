export const state = () => ({
  sidebarCartOpen: false
});

export const mutations = {
  openSidebarCart(state) {
    state.sidebarCartOpen = true;
  },
  closeSidebarCart(state) {
    state.sidebarCartOpen = false;
  },
  toggleSidebarCart(state) {
    state.sidebarCartOpen = !state.sidebarCartOpen;
  }
}
