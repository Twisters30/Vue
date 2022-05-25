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
        <loader
          v-if="productsLoading"
          :color="loaderParam.color"
          :borderWidth="loaderParam.borderWidth"
          :duration="loaderParam.duration"
          :size="loaderParam.size"
          :background="loaderParam.background"
        >
        </loader>
        <div v-if="productsLoadingFailed">
          Ошибка при загрузке товаров!
          <button @click.prevent="loadProducts">Попробовать ещё</button>
        </div>
        <product-list
          :products="products"
          :pic-color="picColor"
          @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"
        />
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
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import loader from '@nulldreams/vue-loading/src/components/loader';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: { ProductFilter, BasePagination, ProductList, loader },
  data() {
    return {
      loaderParam: {
        color: '#8BE000',
        borderWidth: 5,
        duration: 1.5,
        size: 60,
        background: 'transparent'
      },
      picColor: null,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      page: 1,
      productPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  watch: {
    picColor() {
      this.loadProducts();
    },
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items
        .map((product) => {
          return {
            ...product,
            image: product.image.file.url
          }
        }): [];
    },
    countProduct() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(API_BASE_URL + '/api/products',{
          params: {
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.picColor ? this.picColor.id : null,
          }
        })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      },0)
    },
  },
};
</script>
