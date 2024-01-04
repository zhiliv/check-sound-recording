<template>
  <app-spinner class="w-full" v-if="!isLoad" />
  <div class="overflow-y-auto shadow shadow-zinc-300 p-2 rounded-lg border" v-if="isLoad">
    <app-input :is-valid="isValid.name" class="standart w-full input" label="Наименование" v-model="data.name" />
  </div>
</template>

<script lang="ts" setup>
import { useTypesRecordStore } from '~/stores/types-record-store'
const emit = defineEmits(['valid', 'data'])

/** 
* @interface Props
* @member {Object} modelValue - Данные формы
*/
interface Props {
  modelValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
})

/** 
* Модель данных для формы
* @interface Data
*/
interface Data {
  name: String | null
  id: number | null
}

/** 
* Данные формы
* @member {String} name - Наименование
*/
const data = ref({
  name: null,
  id: null,
}) // Данные формы

/** 
* Данные валидации
* @member {Boolean} name - Валидация наименования
*/
const isValid = ref({
  name: false,
  result: false
})

const isLoad = ref(false) // Статус загрузки данных
const store = useTypesRecordStore() // Создание нового стора
const id = ref(props.modelValue.id) // Идентификатор записи

onMounted(async () => {
  const response = await store.getRecord(id.value)
  isLoad.value = true
  data.value.id = id.value
  data.value.name = response.value.name
})


/**
* Наблюдатель для установки валидации
*/
watch(data.value, (newVal: Data) => {
  isValid.value.name = !!(newVal.name && newVal.name.length && newVal.name.length >= 3) // Установка валидации для поля "Наименование"
  /* Установка валидации для поля "Описание" */
  isValid.value.result = getValidForm(isValid.value)
  emit('valid', { save: !isValid.value.result })
  emit('data', data.value)
})

</script>~/stores/default