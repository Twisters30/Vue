<template>
  <li class="cart__item product"
  >
    <div class="product__pic">
      <img
        :src="item.product.image"
        width="120"
        height="120"
        :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <product-counter v-model:count="productAmount" @update:count="update" :key="renderKey" />
    <b class="product__price">
      {{ numberFormat(item.amount * item.product.price) }} ₽
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProductCart(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import ProductCounter from './ProductCounter.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CartItem',
  components: { ProductCounter },
  props: ['item'],
  data() {
    return {
      renderKey: 1,
    }
  },
  computed: {
    productAmount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount',
          { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapActions({ deleteProductCart : 'deleteProduct' }),
    numberFormat,
    update(value) {
      this.productAmount = value < 1 ? 1 : value;
      this.renderKey++;
    },
  },
};
</script>
