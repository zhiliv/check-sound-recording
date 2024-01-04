<template>
  <div
    :class="$attrs.class"
    class="h-full relative w-full shadow-2xl shadow-zinc-300/30"
  >
    <ul
      class="list-group h-full absolute w-full overflow-y-scroll overflow-x-hidden"
      ref="listView"
    >
      <li
        :class="{'active': item.isActive}"
        :key="item[value]"
        @click="onSelect(item)"
        class="min-h-[35px] border-b border-zinc-300/10 hover:bg-amber-700"
        v-for="item in listItems"
      >
        {{item[text]}}
        <button
          class="btn-xs btn-square btn-outline absolute right-0 mr-1"
          v-if="onDelete"
        >
          <svg
            @click="deleteItem(item)"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </li>
    </ul>
    <app-spinner v-show="loading" />
  </div>
</template>

<script lang="ts" setup>
import { Confirm } from '~/types/confirm'
import { Query } from '~/types/query'

const emit = defineEmits(['update:modelValue', 'delete']) // Отправляемые события

/**
 * @type Props
 * @param {Array} list - Список
 * @param {String} value - Свойство значения строки
 * @param {String} text - Свойство текста строки
 * @param {Object} modelValue - Значение поля
 * @param {Boolean} loading - Статус загрузки
 * @param {Function} onDelete - Функция удаления элемента
 * @param {Number} selectIndex - Индекс выбираемого элемента
 * @param {String} urlName - Ссылка
 */
type Props = {
  list?: any
  value?: string
  text?: string
  modelValue: any
  loading: boolean
  onDelete: any
  selectIndex?: number
  urlName?: string
}

const props = withDefaults(defineProps<Props>(), {
  list: [],
  value: 'id',
  text: 'name',
  modelValue: {},
  loading: true,
  onDelete: () => ({}),
  selectIndex: -1,
  urlName: '',
})


const listView = ref() // Ссылка на отображаемый список 
const listItems = computed(() => props.list) // Формирование списка для вывода

/* Наблюдатель за изменением индекса выделяемого элемента */
watch(
  () => props.selectIndex,
  (newVal: any) => {
    if(newVal !== -1) {
      clickIndex(newVal)
    }
  },
  { deep: true },
)

/* Отслеживание статуса загрузки списка */
watch(
  () => props.loading,
  newVal => {
    if(props?.list?.length) clickIndex()
  },
  { deep: true },
)

/**
 * Выполнение клика по строке списка по индексу
 * @function clickIndex
 * @param {Number} index - Порядковый номер выбираемого элемента
 */
async function clickIndex(index?: number | null | undefined) {
  if(!index && index !== -1) index = 0
  if(props?.list?.length) {
    await nextTick() // Ожидание обновления прорисовки списка
    listView.value.querySelectorAll('li')[index].click()
  }
}

/**
 * @function onSelect
 * @param {Object} item - Объект события
 */
function onSelect(item: any) {
  listItems.value.forEach((el: any) => (el.isActive = false)) // Удаления активности со всех элементов
  item.isActive = true // установки активности текущему элементу
  const obj = cloneObject(item) // Клонирование объекта
  delete obj.isActive // Удаление свойства
  emit('update:modelValue', obj) // Отправка события
}

/**
 * Удаление выделенного элемента
 * @function onDeleteItem
 * @param {String} URL - Путь
 * @param {Object} item - Данные строки
 */
async function deleteItem(item: any) {
  const confirmParam: Confirm = {
    message: 'Удалить запись?',
  } // Параметры сообщения подтверждения
  let result = false
  const confirm: Boolean | unknown = await dialogConfirm(confirmParam) // Отображение окна подтверждения
  if(confirm) {
    const paramsQuery: Query = { url: `/api/${props.urlName}/del`, method: 'delete', body: item.id }
    const response: any = await query(paramsQuery) // Отправка запроса на удаление
    if(response?.data?.value?.status == 200) {
      showToast({ message: response.data.value.message, type: 'success' }) // Обработка результата
      result = true
    }
    emit('delete', result)
  }
}
</script>

<style>
  .list-group li {
    padding-left: 0.5em;
    padding-top: 0.25em;
    font-size: 18px;
  }

  .list-group li:hover {
    background: var(--primary);
    color: var(--light);
  }

  .list-group li.active {
    background: #b45309;
  }

  .list-group li.active:hover {
    background: #d97706;
  }
</style>
