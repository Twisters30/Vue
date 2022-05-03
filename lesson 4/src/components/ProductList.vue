<template>
  <ul class="catalog__list">
    <product-item v-for="product of products" :key="product.id" :product="product"/>
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
