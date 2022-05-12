<template>
  <div class="product__counter form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click.prevent="amount--"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input
      type="number"
      v-model.number="amount"
      name="count"
    >

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="amount++"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCounter',
  props: ['count'],
  computed: {
    amount: {
      get() {
        return this.count;
      },
      set(value) {
        this.$emit('update:count', value);
      },
    },
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
