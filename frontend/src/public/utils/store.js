export const store = {
  products: [],
  cart: [],
  setProducts: function(arg) {
    if (typeof arg === 'function') {
      arg(this.products)
    } else {
      this.products = arg;
    }
  },
  setCart: function(arg) {
    if (typeof arg === 'function') {
      arg(this.cart);
    } else {
      this.cart = arg
    }
  }
}