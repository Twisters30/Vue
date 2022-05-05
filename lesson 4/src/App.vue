<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <product-filter
        v-model:price-from="filterPriceFrom"
        v-model:category-id="filterCategoryId"
        v-model:price-to="filterPriceTo"
        v-model:color="picColor"
      />
      <section class="catalog">
        <product-list :products="products" :pic-color="picColor"/>
        <base-pagination
          v-model:page="page"
          :count="countProduct"
          :per-page="productPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductFilter, BasePagination, ProductList },
  data() {
    return {
      picColor: null,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;
      if (this.picColor) {
        filteredProducts = filteredProducts
          .filter((product) => product.colors
            .some((color) => color === this.picColor));
      }
      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts
          .filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        filteredProducts = filteredProducts
          .filter((product) => product.categoryId === this.filterCategoryId);
      }
      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProduct() {
      return this.filteredProducts.length;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
