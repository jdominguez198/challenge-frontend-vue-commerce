export const notifyAddedToCart = (addedToCart: any) => {
  if (addedToCart.isAdding) {
    return;
  }

  if (addedToCart.timer) {
    clearTimeout(addedToCart.timer);
  }

  addedToCart.source = addedToCart.addedText;
  addedToCart.isAdding = true;

  addedToCart.timer = setTimeout(() => {
    addedToCart.source = addedToCart.defaultText;
    addedToCart.isAdding = false;
  }, 1000);
};
