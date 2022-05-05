<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image"  :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
       {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price}}
    </span>
    <ProductColors :product-colors="product.colors" :pic-color="picColor" />
  </li>
</template>

<script>
import ProductColors from './ProductColors.vue';

export default {
  name: 'ProductItem',
  components: { ProductColors },
  props: ['product', 'picColor'],
};
</script>

<style scoped>

</style>
