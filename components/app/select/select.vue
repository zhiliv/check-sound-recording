<template>
  <div
    :class="[$attrs.class, {'px-2': $attrs.multiple}]"
    class="relative"
  >
    <app-spinner
      :class="[$attrs['spinner-class'], {'left-[50%]': $attrs.multiple}]"
      class="absolute pt-2"
      v-if="isLoad === false"
    />
    <label
      class="label py-0 px-2"
      v-if="label"
    >{{label}}</label>
    <select
      :class="[$attrs['select-class'], {'mt-3': $attrs.multiple}]"
      :disabled="attrs?.disabled"
      :multiple="attrs.multiple"
      class="select select-bordered"
      v-model="selected"
      
    >
      <option
        disabled
        v-if="!options.length"
      >Список пуст</option>
      <option
        disabled
        v-if="options.length && required"
      >Выберите значение</option>
      <option
        :key="item[value]"
        :value="item[value]"
        style="font-size: 1.4em;"
        v-for="item in options"
      >{{item[text]}}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const attrs = useAttrs() // Получение аттрибутов

/**
 * @type Props
 * @param {Array} options - Список
 * @param {String} label - Заголовок списка
 * @param {String} value - Наименование свойства значения
 * @param {String} text - Текстовое значение выделенного элемента
 * @param {Boolean} required - Обязательно поля
 * @param {Boolean} isLoad - Статус загрузки списка
 * @param {Any} selectValue - Значение выделенного элемента списка
 * @param {Boolean} disabled - Активность поля
 * @param {Boolean} multiple - Множественный выбор
 */
type Props = {
  options: any
  label?: string
  value?: string
  text?: string
  required?: boolean
  isLoad: boolean | string
  selectValue?: any
  disabled?: boolean
  multiple?: boolean
}

/* Установка данных по умолчанию для входных свойств */
const props = withDefaults(defineProps<Props>(), {
  options: [],
  value: 'id',
  text: 'name',
  required: false,
  isLoad: false,
  selectValue: null
})

const emit = defineEmits(['update:modelValue', 'update:selectValue']) // Отправляемые события 
const selected = ref() // Выделенный элемент

/* Отслеживание изменений выбранных элементов */
watch(selected, newVal => {
  emit('update:modelValue', newVal) // Отправка события для обновления модели данных
})

/* При монтировании компонента */
onMounted(() => {
  selected.value = props.selectValue || null
})


</script>

<style>

</style>