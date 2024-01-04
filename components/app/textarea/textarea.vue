<template>
  <label
    class="label py-0 px-2"
    v-if="label"
  >{{ label }}</label>
  <textarea
    :class="[attrs.class, { 'textarea-success': props.isValid === true, 'textarea-error': props.isValid === false, 'mt-2': !label }]"
    :pattern="patterns"
    :style="$attrs.style"
    :value="modelValue"
    @input="handler"
    class="textarea textarea-bordered w-full"
  />
</template>

<script lang="ts" setup>
const attrs = useAttrs() // Получение переданных аттрибутов
const emit = defineEmits(['update:modelValue']) // Отправляемые события

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
  modelValue: string | null | any // Данные поля
  label?: string | null // Подпись поля
  patterns?: string | undefined // Паттерны
  isValid?: string | null | boolean // Валидация поля
}

/* Установка значений по умолчанию для входных параметров */
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: null,
  type: 'text',
  isValid: null,
  maxlength: null
})
</script>
