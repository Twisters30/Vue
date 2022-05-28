<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name:'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalAmountProducts }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <base-form-text
              v-model:value="formData.name"
              :error="formError.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
            />
            <base-form-text
              title="Адрес доставки"
              v-model:value="formData.address"
              :error="formError.address"
              placeholder="Введите ваш адрес"
            />
            <base-form-text
              title="Телефон"
              v-model:value="formData.phone"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
            />
            <base-form-text
              title="Email"
              v-model:value="formData.email"
              :error="formError.email"
              placeholder="Введи ваш Email"
            />
            <base-form-textarea
              title="Коментарий к заказу"
              v-model:value="formData.comment"
              :error="formError.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in cartProduct" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{  item.product.price }} ₽
                <span style="white-space: nowrap">количество {{ item.amount }} шт.</span></b>
              <span>Артикул: {{  item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalAmountProducts }}</b> товара на сумму <b>{{ totalPrice }} ₽</b></p>
          </div>

          <button
            :disabled="orderSending"
            class="cart__button button button--primery"
            type="submit"
          >
            Оформить заказ
          </button>
          <loader
            v-if="orderSending"
            :color="loaderParam.color"
            :borderWidth="loaderParam.borderWidth"
            :duration="loaderParam.duration"
            :size="loaderParam.size"
            :background="loaderParam.background"
          >
          </loader>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import loader from '@nulldreams/vue-loading/src/components/loader';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';

export default {
  name: 'OrderPage',
  components: { BaseFormTextarea, BaseFormText, loader },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderSending: false,
      loaderParam: {
        color: '#8BE000',
        borderWidth: 5,
        duration: 1.5,
        size: 60,
        background: 'transparent'
      },
    };
  },
  computed: {
    ...mapGetters(
      {
        cartProduct: 'cartDetailProduct',
        totalPrice: 'cartTotalPrice',
        totalAmountProducts: 'cartTotalAmount'
      }),
  },
  methods: {
    order() {
      this.orderSending = true;
      this.formError = {};
      this.formErrorMessage = '';
      return axios
      .post(API_BASE_URL + '/api/orders', {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        }
      })
      .then(response => {
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
      })
      .catch(error => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
      })
      .then(() => this.orderSending =  false);
    }
  }
};
</script>

<style scoped>

</style>
