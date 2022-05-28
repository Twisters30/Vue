<template>
  <base-form-field :title="title" :error="error">
    <input
      class="form__input"
      type="text"
      v-model="dataValue"
      name="name"
      :placeholder="placeholder">
  </base-form-field>
</template>

<script>
import formFieldsMixin from '@/mixins/formFieldsMixin'

export default {
  name: 'BaseFormText',
  mixins: [formFieldsMixin],
};
</script>

<style scoped>

</style>
