<template>
  <div class="content container" v-if="productLoading">Загрузка товара...</div>
  <div class="content container" v-else-if="!productData">Не удалось загрузить товар</div>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            href="index.html"
            :to="{ name: 'main' }"
            >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            href="#"
            :to="{ name: 'main' }"
            >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image"
            :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ numberFormat(product.price) }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="(color,i) in product.colors" :key="i">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      :value="color.id"
                      v-model="checkedColor"
                    >
                    <span class="colors__value" :style="{'background-color': color.code}">
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only"
                           type="radio"
                           name="sizes-item"
                           value="128"
                           checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <product-counter :count="productAmount" @update:count="update" :key="renderKey" />
              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар Добавлен в корзину</div>
            <loader
              class="loader__add-product"
              v-show="productAddSending"
              :color="loaderParam.color"
              :borderWidth="loaderParam.borderWidth"
              :duration="loaderParam.duration"
              :size="loaderParam.size"
              :background="loaderParam.background"
            >Добавляем товар в корзину...</loader>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер,
            который позволяет оптимизировать свои велотренировки,
            сделав их максимально эффективными.
            Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
            объединяя полученную с них информацию. Данные отображаются на дисплее,
            а также сохраняются на смартфоне.
            При этом на мобильное устройство можно установить как фирменное приложение,
            так и различные приложения сторонних разработчиков.
            Велокомпьютер точно отслеживает местоположение,
            принимая сигнал с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость,
            а также полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в
            комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7.
            Это означает, что устройство не боится пыли,
            а также выдерживает кратковременное (до 30 минут) погружение
            в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ProductCounter from '@/components/ProductCounter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from  'vuex';
import loader from '@nulldreams/vue-loading/src/components/loader';

export default {
  name: 'ProductPage',
  components: { ProductCounter, loader },
  data() {
    return {
      loaderParam: {
        color: '#8BE000',
        borderWidth: 5,
        duration: 1.5,
        size: 25,
        background: 'transparent'
      },
      productAmount: 1,
      renderKey: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
    };
  },
  computed: {
    checkedColor() {
      return [...this.productData.colors].shift().id;
    },
    product() {
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    gotoPage,
    numberFormat,
    ...mapActions(['addProductCart']),
    update(value) {
      this.productAmount = value < 1 ? 1 : value;
      this.renderKey++;
    },
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductCart({ productId: this.product.id, amount: this.productAmount })
      .then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      })
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(API_BASE_URL + '/api/products/' + this.$route.params.id)
      .then(response => this.productData = response.data)
      .catch(() => this.productLoadingFailed = true)
      .then(() => this.productLoading =  false);
    },
  },
  created() {
    this.loadProduct();
  },
  beforeRouteUpdate() {
    this.loadProduct();
  },
  watch: {
    productData() {
      this.productData['image'] = this.productData.image.file.url;
    }
  }
};
</script>

<style>
  .loader__add-product {
    justify-content: start;
    position: static;
    overflow: visible;
  }
  @keyframes jump {
    0% {}
    50% {
      transform: translateY(-20px);
    }
    100% {}
  }
</style>
