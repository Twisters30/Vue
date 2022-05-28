import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

const store = new Vuex.Store({
  state: {
    cartProduct: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProduct = [];
      state.cartProductsData = [];
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
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProduct = state.cartProduct
        .filter((product) => product.productId !== productId);
    },
    updateAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProduct = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        }
      })
    }
  },
  getters: {
    totalOrderPrice(state) {
      return state.orderInfo.basket.items
        .reduce((accum, item) => (item.price * item.quantity) + accum,0);
    },
    totalOrderAmounts(state) {
      return state.orderInfo.basket.items
        .reduce((accum, item) => (item.quantity) + accum,0)
    },
    cartDetailProduct(state) {
      return state.cartProduct.map((item) => {
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          }
        }
      });
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
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(API_BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
        })
    },
    loadCart(context) {
     return axios
        .get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts', response.data.items);
        })
    },
    addProductCart(context, { productId, amount}) {
      return (new Promise(resolve => setTimeout(resolve, 1000)))
        .then(() => {
        return axios.post(API_BASE_URL + '/api/baskets/products', {
            productId: productId,
            quantity: amount,
          },{
            params: {
              userAccessKey: context.state.userAccessKey,
            }
          })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts', response.data.items);
            })
        })
    },
    updateCartProductAmount(context, { productId, amount}) {
      context.commit('updateCartProductAmount', { productId, amount});
      if (amount < 1) return ;
      return axios
        .put(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount,
      },{
        params: {
          userAccessKey: context.state.userAccessKey,
        }
      })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        })
    },
    deleteProduct(context, productId) {
      context.commit('deleteCartProduct', productId);
      return axios
        .delete(API_BASE_URL + `/api/baskets/products`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
          data: {
            productId: productId,
          }
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        })
    }
  },
});

export default store;
