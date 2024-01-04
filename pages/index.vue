<template>
  <div class="w-full h-full max-h-full">
    <div>
      <app-control-record ref="control"  modal-title-edit="Анализ записи" modal-width-new="60%" modal-title-new="Загрузка записей" :p-select-item="selectItem"
        @on-edit="onEdit" @on-delete="onDelete" :uniq="true" name-edit-form="analyzer_form" :buttons="buttons">
        <template v-slot:start>
          <app-button @click="onLoadData" class="standart btn-primary btn-sm p-2 md:m-1 mt-1 w-full md:w-auto btn-record add ring ring-blue-100 text-white">
            <svg v-if="!isLoadData" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <circle cx="12" cy="12" r="9" />
                <path stroke-dasharray="14" d="M8 12L11 15L16 10">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="28;14" />
                </path>
              </g>
            </svg>
            <svg v-if="isLoadData" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
                <path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3"
                  d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0" />
                </path>
                <path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
                  <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                </path>
              </g>
            </svg>
            Загрузить новые
          </app-button>
        </template>
      </app-control-record>
    </div>
    <div class="min-h-full">
      <app-table ref="table" :store="store" :columns="columns" @click="(data) => selectItem = data" @dblclick="onDblEdit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRecordStore } from '~/stores/records-store'
const isLoadData = ref(false)
const buttons = ref({
  add: {
    show: false
  },
  edit: {
    show: true
  },
  delete: {
    show: true
  }
})

const meta = { title: 'Записи' } // Установка мета данных страницы
useSeoMeta(meta) // Установка заголовка
const selectItem = ref() // Данные о выбранной записи
const table = ref() // Ссылка на элемент таблицы
const control = ref() // Ссылка на кнопки управления
const store = useRecordStore() // Создание нового стора

const columns = [
  {
    key: 'id',
    label: 'Идентификатор',
    width: '200px',
    textPosition: 'center',
    labelPosition: 'center',
    filter: 'number'
  },
  { key: 'name', label: 'Наименование', filter: 'text' },
  { key: 'seconds', label: 'Продолжительность записи', filter: 'number' },
  { key: 'filename', label: 'Имя файла', filter: 'text' },
  { key: 'created_record', label: 'Дата создания записи разговора', filter: 'text' },
  { key: 'text', label: 'Текст разговора', filter: 'text' },
  { key: 'created_at', label: 'Дата добавления', filter: 'text' },
  { key: 'type_record_name', label: 'Дата добавления', filter: 'text' },
]

/** 
 * Редактирование записи
* @function onEdit
* @param {Object} data - Данные для редактирования
*/
async function onEdit(data: any) {
  const result: any = await store.editRecord(data)
  if(result?.value)
    showToast({ message: result?.value?.message, type: result?.value?.typeMessage }) // Отображение сообщения об успешном обновлении записи
}

/** 
 * Удаление записи
* @function onDelete
*/
async function onDelete() {
  const result: any = await store.deleteRecord({ id: selectItem.value.id, _url: '/categories' })
  if(result?.value)
    showToast({ message: result?.value?.message, type: result?.value?.typeMessage }) // Отображение сообщения об успешном удалении записи
}

/** 
* Редактирование записи при двойном клике
* @function onDblEdit
* @param {Object} data - Данные для открытия формы
*/
function onDblEdit(data?: any) {
  control.value.onEdit(data)
}

const onLoadData = async () => {
  isLoadData.value = true
  const count = await store.loadData()
  isLoadData.value = false
}
</script>