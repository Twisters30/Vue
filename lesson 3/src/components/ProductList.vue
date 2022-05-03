<template>
  <ul class="catalog__list">
    <product-item v-for="(product, index) of products" :key="index" :product="product"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  name: 'ProductList',
  components: { ProductItem },
  props: ['products'],
};
</script>

<style scoped>

</style>
