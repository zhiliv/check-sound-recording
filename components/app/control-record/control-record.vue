<template>
  <div class="pt-1 max-md:p-2 h-full lg:mr-3" ref="control">
    <slot name="start" />
    <app-button @click="onNew" v-if="props.buttons.add.show"
      class="standart btn-primary btn-sm p-2 md:m-1 mt-1 w-full md:w-auto btn-record add ring ring-blue-100 text-white">
      <svg class="add-record h-[16px] w-[18px]" enable-background="new 0 0 24 24" id="Layer_1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m22 9h-7v-7h-6v7h-7v6h7v7h6v-7h7z" />
      </svg>
      Добавить
    </app-button>
    <app-button :disabled="!pSelectItem" @click="onEdit" v-if="props.buttons.edit.show" :class="{ 'ring': pSelectItem, 'ring-green-100': pSelectItem }"
      class="standart btn-success btn-sm p-2 md:m-1 mt-1 w-full md:w-auto btn-record edit hover:bg-green-700 text-white">
      <svg class="edit-record h-[16px] w-[18px]" id="Layer_1" version="1.1" viewBox="0 0 490.584 490.584" x="0px" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" y="0px">
        <g>
          <g>
            <path
              d="M100.911,419.404l123.8-51c3.1-2.1,6.2-4.2,8.3-6.2l203.9-248.6c6.2-9.4,5.2-21.8-3.1-29.1l-96.8-80.1 c-8-5.9-20.3-6.8-28.1,3.1l-204.9,248.5c-2.1,3.1-3.1,6.2-4.2,9.4l-26,132.1C72.511,420.104,90.611,424.004,100.911,419.404z M326.611,49.004l65.5,54.1l-177.7,217.1l-64.9-53.7L326.611,49.004z M133.411,306.904l44.4,36.8l-57.2,23.6L133.411,306.904z" />
            <path
              d="M469.111,448.504h-349.5c0,0-72.5,3.4-75.2-15.2c0-1-1.8-5.6,7.6-17c7.3-9.4,6.2-21.8-2.1-29.1 c-9.4-7.3-21.8-6.2-29.1,2.1c-19.8,23.9-25,44.7-15.6,63.5c25.5,47.5,111.3,36.3,115.4,37.3h348.5c11.4,0,20.8-9.4,20.8-20.8 C490.011,457.804,480.611,448.504,469.111,448.504z" />
          </g>
        </g>
      </svg>
      Изменить
    </app-button>
    <slot name="center" />
    <app-button v-if="props.buttons.delete.show" :disabled="!pSelectItem" @click="onDelete" :class="{ 'ring': pSelectItem, 'ring-red-100': pSelectItem }"
      class="standart btn-error btn-sm p-2 md:m-1 mt-1 w-full mb-2 md:w-auto float-right btn-record delete hover:bg-rose-700">
      <svg class="delete-record h-[16px] w-[18px]" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g data-name="Layer 8" id="Layer_8">
          <path d="m32 2.75a29.25 29.25 0 1 0 29.25 29.25 29.28 29.28 0 0 0 -29.25-29.25zm0 56a26.75 26.75 0 1 1 26.75-26.75 26.78 26.78 0 0 1 -26.75 26.75z" />
          <path
            d="m47 24.42a5.26 5.26 0 0 0 0-7.42 5.26 5.26 0 0 0 -7.42 0l-5.64 5.64a2.8 2.8 0 0 1 -3.88 0l-5.64-5.64a5.25 5.25 0 0 0 -7.42 7.42l5.64 5.64a2.73 2.73 0 0 1 0 3.88l-5.64 5.64a5.25 5.25 0 0 0 7.42 7.42l5.64-5.64a2.8 2.8 0 0 1 3.88 0l5.64 5.64a5.25 5.25 0 0 0 7.42-7.42l-5.64-5.64a2.73 2.73 0 0 1 0-3.88z" />
        </g>
      </svg>
      Удалить
    </app-button>
    <slot name="end" />


  </div>
</template>

<script lang="ts" setup>

const control: Element | any = ref() // Ссылка на компонента
const emit = defineEmits(['onNew', 'onEdit', 'onDelete'])  // Отправляемые события
const selectItem: any = ref(null) // Выделенный элемент

/**
 * @type Props 
 * @param {String} modalTitleNew - Заголовок модального окна для создания записи
 * @param {String} modalTitleEdit - Заголовок формы редактирования
 * @param {String} modalWidthNew - Ширина модального окна
 * @param {Object} pSelectItem - Данные выбранной строки
 * @param {Object} buttons - Список стандартных кнопок  
 */
type Props = {
  modalTitleNew: string
  modalTitleEdit: string
  modalWidthNew: string
  pSelectItem: any
  nameEditForm: string
  buttons?: any
}

/** Установка входных свойств по умолчанию  */
const props = withDefaults(defineProps<Props>(), {
  modalTitleNew: '',
  modalTitleEdit: '',
  modalWidthNew: '',
  pSelectItem: null,
  nameEditForm: '',
  buttons: {
    add: {
      show: true
    },
    edit: {
      show: true
    },
    delete: {
      show: true
    }
  }
})

/** 
* Создание новой записи
* @function onNew
*/
async function onNew() {
  const body: any = await showModal('modal_name', { options: { title: props.modalTitleNew, width: props.modalWidthNew, isDrawer: false, buttons: { save: true, cancel: true } } }) // Получение ответа из модального окна
  if(body?.name) {
    body.name = capitalize(body.name)
    emit('onNew', body)
  }
}

/** 
* Редактирование данных зиписи
* @function onEdit 
*/
async function onEdit() {
  const body: any = await showModal(props.nameEditForm, {
    options: {
      title: props.modalTitleEdit, width: props.modalWidthNew, buttons: { save: true, cancel: true }, isDrawer: true
    }, ...props.pSelectItem || selectItem.value
  }) // Получение ответа из модального окна
  if(body && body.id) {
    emit('onEdit', body)
  }
}

/** 
* Удаление записи
* @function onDelete
*/
async function onDelete() {
  const body: any = await showModal('modal_confirm', { options: { title: 'Удалить запись?', width: '20%', isDrawer: false, buttons: { cancel: false, yes: true, no: true }, text: 'Подтвердите удаление записи' } }) // Получение ответа из модального окна
  if(body) {
    emit('onDelete', body)
  }
}

/** 
* Установка значения выбранной строки
* @function setSelectItem
*/
const setSelectItem = (data: any) => {
  selectItem.value = data
}

/** Указание доступных для чтения свойств  */
defineExpose({
  control, onEdit, setSelectItem
})

</script>

<style scoped>
.btn-record:hover>* {
  fill: white;
}

.btn-record:hover {
  color: white;
}

.add-record,
.edit-record,
.delete-record {
  fill: white;
  transition: 0.3s;
}
</style>