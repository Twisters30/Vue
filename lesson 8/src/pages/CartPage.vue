<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalAmount }} товар
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <cart-item
              v-for="item in products"
              :key="item.productId"
              :item="item"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ numberFormat(totalPrice) }} ₽</span>
          </p>

          <router-link
            v-slot="{navigate}"
            :to="{ name: 'order'}"
            custom
          >
            <button
              @click="navigate"
              class="cart__button button button--primery"
              type="button"
              v-if="$store.state.cartProduct.length"
            >
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';

export default {
  name: 'CartPage',
  components: { CartItem },
  computed: {
    ...mapGetters(
      {
        products: 'cartDetailProduct',
        totalPrice: 'cartTotalPrice',
        totalAmount: 'cartTotalAmount',
      },
    ),
  },
  methods: {
    numberFormat,
  },
};
</script>

<style scoped>

</style>
