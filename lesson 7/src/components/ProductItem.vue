<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      href="#"
      :to="{name: 'product', params: {id: product.id}}"
    >
      <img :src="product.image"  :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
       {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ numberFormat(product.price) }} ₽
    </span>
    <ul class="colors colors--black">
      <li class="colors__item" v-for="(productColor,i) in product.colors" :key="productColor + i">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="productColor.code"
            v-model="filterColor"
          >
          <span
            class="colors__value"
            :style="{'background-color': productColor.code}">
        </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product', 'picColor'],
  computed: {
    filterColor(){
      return this.picColor ? this.picColor.code : null;
    },
    selectedColor() {
      return [...this.product.colors].shift().code;
    }
  },
  methods: {
    gotoPage,
    numberFormat,
  },
};
</script>

<style scoped>

</style>
