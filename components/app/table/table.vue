<template>
  <div class="w-full pr-1 md:max-w-full md:min-w-full md:flex flex-wrap h-full max-md:pt-10 tbl" ref="table">
    <div class="flex flex-col md:flex-row w-full mr-3">
      <div :class="{ 'w-full': !column?.width, 'border-r': index === columns.length - 1 }" :key="column" :style="{ 'min-width': column?.width }"
        class="border-l border-b border-t border-zinc-300" v-for="(column, index) in columns">
        <div :style="{ 'width': column?.width }" class="bg-neutral-200 border-l border-t border-b pl-1 pr-1 min-w-full min-h-[55px]">
          <div class="z-100 text-zinc-700 text-sm font-medium pl-1">{{ column.label }}</div>
          <div class="w-full flex relative" v-if="column.filter === 'text'">
            <app-select :is-load="true" :options="listFilter" :select-value="listFilter[0].value" select-class="select-sm w-14 absolute left-0 bg-zinc-100"
              v-model="column.filterCondition" value="value" />
            <app-input class="input-sm w-full" style="padding-left: 60px" v-model.trim="column.filterValue" />
            <app-button @click="applyFilter(column.key, column.filterValue, column.filterCondition)"
              class="btn-sm absolute right-0 border-zinc-300 bg-zinc-100 hover:bg-zinc-400 text-lime-500">
              <nuxt-icon class="icon-apply" filled loading="lazy" name="mdi/check-bold" quality="90" />
            </app-button>
          </div>
          <div class="w-full relative flex" v-if="column.filter === 'number'">
            <app-input class="input-sm w-full" v-model.trim="column.filterValue" />
            <app-button @click="applyFilter(column.key, column.filterValue, column.filterCondition)"
              class="btn-sm absolute right-0 border-zinc-300 bg-zinc-100 hover:bg-zinc-400 text-lime-500">
              <nuxt-icon class="icon-apply" filled loading="lazy" name="mdi/check-bold" quality="90" />
            </app-button>
          </div>
        </div>
      </div>
    </div>
    <app-spinner class="w-full" v-show="!store.list" />
    <div :class="{'overflow-y-scroll': store.list.length }" class="min-h-full w-full overflow-x-hidden shadow-lg shadow-zinc-300 border" ref="tableBody">
      <div :key="row.key" @click="onClick(row)" @dblclick="dblClick(row)"
        class="md:flex lg:h-[35px] row-table border-zinc-300 row-table max-md:border-b-2 md:border-b hover:bg-gray-100 w-full max-w-full"
        v-for="row in store.list" v-if="store.list">
        <div :class="{ 'w-full': !column?.width, 'border-r': index === columns.length - 1 }" :key="column" :style="{ 'min-width': column?.width }"
          class="md:border-l pl-2" v-for="(column, index) in columns">
          <span class="font-medium sm:hidden" v-if="row[column.key]">{{ column.label }}</span>
          <div class="h-full truncate-text pt-1 w-full max-md:pl-6 max-md:py-2" v-html="row[column.key]" />
        </div> 
      </div>
    </div>
    <pagination :count="store.count" :count-items="limit" @pagination="getPagination" />
  </div>
</template>

<script lang="ts" setup>
import pagination from './pagination/pagination.vue'

/**
 * Описание сущности "Колонка"
 * @type Column
 * @param {String} key - Наименование колонки
 * @param {String} label - Текстовое значение имени колонки
 * @param {String} width - Ширина колонки
 * @param {String} textPosition - Положение текста
 * @param {String} labelPosition - Положение текста заголовка колонки
 * @param {String} filter - Тип фильтра
 * @param {Any} filterValue - Значение фильтра
 * @param {String} filterCondition - Тип условия отбора
 */
type Column = {
  key: string
  label: string
  width?: string
  textPosition?: 'left' | 'right' | 'center'
  labelPosition?: 'left' | 'right' | 'center'
  filter: 'text' | 'list' | 'number'
  filterValue: string | number | boolean | null
  filterCondition: '=' | '>' | '<' | '%'
}

/**
 * Описание сущности входных свойств
 * @type Props
 * @param {Array} columns - Список колонок
 * @param {Objert} store - Стор для обмена данными
 */
type Props = {
  columns: Column[] | any
  store: any
  limit?: number
}

const emit = defineEmits(['click', 'offset', 'dblclick']) // События для отправки

/* Установка значений входных параметров по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  columns: null,
  limit: 50
})

const offset = ref(0) // Значение сдвига
const table = ref() // Ссылка на элемент таблицы

/** Доступные свойства из вне  */
defineExpose({
  applyFilter, columns: props.columns, table, dblClick
})

/** Список фильтров */
const listFilter = ref([
  { value: '=', name: '=' },
  { value: '>', name: '>' },
  { value: '<', name: '<' },
  { value: '%', name: '%' }
]) // список статусов) 

await props.store.getCount() // Получение всех строк
props.store.limit = props.limit // Установка лимита
props.store.offset = offset.value // Установка сдвига
await props.store.getList() // Получение всех строк

const tableBody = ref<any>() // Ссылка на таблица


/**
 * @function dblClick
 * @param {Object} item - Данные выделенной строки
 */
function dblClick(item: any) {
  emit('dblclick', item)
}

/**
 * Применение фильтра
 * @function applyFilter
 * @param {String} key - Наименование ключа фильтра
 * @param {String} value - Значение фильтра
 */
async function applyFilter(key: string, value: any, filterCondition: string) {
  await props.store.setFilter(key, value, filterCondition)
}

/**
 * Событие пи одиночном клике на строку
 * @function onClick
 * @param {Object} item - Данные строки
 */
function onClick(item: any) {
  if(props?.store?.list?.length){
  const index = props.store.list.findIndex((el: any) => el.id === item.id) // Получение индекса элемента
    const listEls = tableBody.value.querySelectorAll('.row-table') // Получение списка строк DOM модели
    listEls.forEach((el: any) => el.classList.remove('active')) // Удаление активного класса
    listEls[index].classList.add('active') // Добавление активного класса
    emit('click', item)  
  }
  
}

/** 
** Получение значения пагинации
* @function getPagination
* @param {Object} value - Получение данных по значению пагинации
*/
async function getPagination(value: any) {
  offset.value = value // Значение сдвига
  props.store.limit = props.limit // Установка лимита в стор
  props.store.offset = ((offset.value - 1) * props.limit) // Установка сдвига по стор
  await props.store.getList() // Получение всех строк
}

/** При монтировании компонента  */
onMounted(() => {
  if(window.outerHeight > 800)
    tableBody.value.style.height = table.value.parentNode.parentNode.offsetHeight - 185 + 'px' // Установка высоты таблицы
  window.addEventListener("resize", () => { // отслеживание изменений размера окна
    if(window.outerHeight > 800)
      tableBody.value.style.height = table.value.parentNode.parentNode.offsetHeight - 185 + 'px' // Установка высоты таблицы
  })
})
</script>

<style scoped>
.truncate-text {
  margin: 0;
  /* Убираем внешний отступ */
  -webkit-line-clamp: 1;
  /* Число отображаемых строк */
  display: -webkit-box;
  /* Включаем флексбоксы */
  -webkit-box-orient: vertical;
  /* Вертикальная ориентация */
  overflow: hidden;
  /* Обрезаем всё за пределами блока */
}

.icon-apply {
  font-size: 1em;
  fill: #166534;
}

.pl-16 {
  padding-left: 56% !important
}
</style>