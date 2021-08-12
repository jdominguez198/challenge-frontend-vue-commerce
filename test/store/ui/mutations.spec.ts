import mutations from '~/store/ui/mutations';
import { UiState } from '~/store/ui/state';

describe('UiState', () => {
  test('should toggle the sidebarCart', () => {
    const stateNotOpen: UiState = {
      sidebarCartOpen: false
    };
    const stateOpen: UiState = {
      sidebarCartOpen: true
    };
    mutations.TOGGLE_SIDEBAR_CART(stateNotOpen);
    mutations.TOGGLE_SIDEBAR_CART(stateOpen);
    expect(stateNotOpen.sidebarCartOpen).toBe(true);
    expect(stateOpen.sidebarCartOpen).toBe(false);
  });
});
