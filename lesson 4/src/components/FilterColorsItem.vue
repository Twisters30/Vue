<template>
  <li class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        name="color"
        :value="color"
        v-model="currentColor"
        @click="selectColor(color)"
      >
      <span class="colors__value" :style="{ 'background-color': color }">
      </span>
    </label>
  </li>
</template>

<script>
export default {
  name: 'FilterColorsItem',
  props: ['color', 'selectedColor'],
  computed: {
    currentColor() {
      return this.selectedColor;
    },
  },
  methods: {
    selectColor(value) {
      this.$emit('update:selectedColor', value);
    },
  },
};
</script>

<style scoped>

</style>
