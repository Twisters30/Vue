import BaseFormField from '@/components/BaseFormField.vue';

export default {
  name: 'BaseFormTextarea',
  components: { BaseFormField },
  props: ['title' , 'value', 'error', 'placeholder'],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      }
    }
  },
};
