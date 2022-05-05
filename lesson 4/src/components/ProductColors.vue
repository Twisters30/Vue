<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="(productColor,i) in productColors" :key="productColor + i">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="productColor"
          v-model="checkedColor"
        >
        <span
          class="colors__value"
          :style="{'background-color': productColor}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProductColors',
  props: ['productColors', 'picColor'],
  computed: {
    checkedColor() {
      return this.picColor ? this.picColor : '#73B6EA';
    },
  },
};
</script>

<style scoped>

</style>
