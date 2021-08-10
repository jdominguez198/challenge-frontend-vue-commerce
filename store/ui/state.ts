export interface UiState {
  sidebarCartOpen: boolean;
}

export const state = (): UiState => ({
  sidebarCartOpen: false
});

export default state;
