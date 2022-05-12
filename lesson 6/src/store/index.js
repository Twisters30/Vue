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
    amountIncrement(state, productId) {
      const item = state.cartProduct
        .find((product) => product.productId === productId);
      if (item) {
        item.amount += 1;
      }
    },
    amountDecrement(state, productId) {
      const item = state.cartProduct
        .find((product) => product.productId === productId);
      if (item) {
        item.amount -= 1;
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProduct
        .find((product) => product.productId === productId);
      if (item) {
        item.amount = +amount;
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
