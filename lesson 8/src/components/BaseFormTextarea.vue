<template>
  <base-form-field :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      name="comments"
      :placeholder="placeholder">
    </textarea>
  </base-form-field>
</template>

<script>
import formFieldsMixin from '@/mixins/formFieldsMixin'

export default {
  name: 'BaseFormTextarea',
  mixins: [formFieldsMixin]
};
</script>

<style scoped>

</style>
