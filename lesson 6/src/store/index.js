import Vuex from 'vuex';
import products from '@/data/products';

const store = new Vuex.Store({
  state: {
    cartProduct: [
      { productId: 1, amount: 1 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProduct
        .find((product) => product.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProduct.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount, increment }) {
      const item = state.cartProduct
        .find((product) => product.productId === productId);
      if (item) {
        item.amount = amount;
      }
      if (increment === 'increment') {
        item.amount += 1;
      } else if (increment === 'decrement' && item.amount !== 1) {
        item.amount -= 1;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProduct = state.cartProduct
        .filter((product) => product.productId !== productId);
    },
  },
  getters: {
    cartDetailProduct(state) {
      return state.cartProduct.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProduct
        .reduce((accum, item) => (item.product.price * item.amount) + accum, 0);
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProduct
        .reduce((accum, item) => item.amount + accum, 0);
    },
  },
});

export default store;
