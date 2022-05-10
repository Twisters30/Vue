<template>
  <div class="product__counter form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="amountDecrement(item.productId)"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="number" v-model="amount" name="count">

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="amountIncrement(item.productId)"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ProductCounter',
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store
          .commit('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations(['amountIncrement', 'amountDecrement']),
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
