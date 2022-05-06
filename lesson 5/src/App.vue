<template>
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
    @gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"
  />
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: { ProductPage, NotFoundPage, MainPage },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  mounted() {
    this.eventBus.on('gotoPage', (param) => this.gotoPage(param));
  },
  methods: {
    gotoPage(param) {
      this.currentPage = param.page;
      this.currentPageParams = { id: param.id } || {};
    },
  },
};

</script>
