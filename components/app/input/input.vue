<template>
  <label
    class="label pb-0 px-2"
    v-if="label"
  >{{label}}</label>
  <input
    :class="[attrs.class, { 'input-success': props.isValid === true, 'input-error': props.isValid === false }]"
    :disabled="$attrs.disabled"
    :maxlength="maxlength"
    :pattern="patterns"
    :style="$attrs.style"
    :type="type"
    :value="modelValue"
    @input="handler"
    class="input input-bordered pt-1"
  />
</template>

<script lang="ts" setup>
const attrs = useAttrs() // Получение переданных аттрибутов
const emit = defineEmits(['update:modelValue']) // События

/**
 ** Отправка события при  изменении поля ввода
 * @function handler
 * @param {Object} event - Объект события
 */
const handler = (event: any) => {
  emit('update:modelValue', event.target.value ? event.target.value : null)
}

/** 
* @type Props
* @param {String} modelValue - Данные поля
* @param {String} label - Подпись поля
* @param {String} type - Тип поля 
* @param {RegExp} patterns - Паттерн ввода
* @param {Boolean} isValid - Значение валидации
* @param {Number} maxlength - Максимальная длина
*/
type Props = {
  modelValue: string | null | any
  label?: string | null
  type?: string
  patterns?: string | undefined
  isValid?: string | null | boolean
  maxlength?: any | number | undefined
}

/* Установка значений PROPS */
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: null,
  type: 'text',
  isValid: null,
  maxlength: null
})
</script>
