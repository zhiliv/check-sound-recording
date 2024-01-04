<template>
  <app-spinner class="w-full" v-if="!isLoad" />
  <div class="overflow-y-auto shadow shadow-zinc-300 p-2 rounded-lg border flex" v-if="isLoad">
    <div class="w-[300px]">
      <app-input class="standart w-full input" label="Наименование" v-model="data.name" />
    </div>
    <div class="w-[320px] ml-2">
      <app-input class="standart w-full input" label="Имя файла" v-model="data.filename" />
    </div>
    <div class="w-[320px] ml-2 mt-2">
      <app-select label="Тип записи" :is-load="true" :select-value="data.type_record" :options="storeTypeRecord.list" select-class="standart select-xs w-full absolute left-0 bg-zinc-100" v-model="data.type_record"
        value="id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRecordStore } from '~/stores/records-store'
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
  type_record: number | null
  filename: string | null
}

/** 
* Данные формы
* @member {String} name - Наименование
*/
const data = ref({
  name: null,
  id: null,
  filename: null,
  type_record: null
}) // Данные формы

const typeRecordSelect = ref()

/** 
* Данные валидации
* @member {Boolean} name - Валидация наименования
*/
const isValid = ref({
  name: false,
  result: false
})

const isLoad = ref(false) // Статус загрузки данных
const store = useRecordStore() // Создание нового стора
const storeTypeRecord = useTypesRecordStore()
const id = ref(props.modelValue.id) // Идентификатор записи

onMounted(async () => {
  await storeTypeRecord.getList()
  storeTypeRecord.list.unshift({id: null, name: null})
  const response = await store.getRecord(id.value)
  isLoad.value = true
  data.value.id = id.value
  data.value.name = response.value.name
  data.value.filename = response.value.filename
  data.value.type_record = response.value.type_record
  typeRecordSelect.value = response.value.type_record
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