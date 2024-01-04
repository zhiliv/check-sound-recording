
<template>
  <div class="btn-group justify-center w-full border-t py-2 h-16 min-h-16 flex" ref="listPagination" v-if="list.length > 1">
    <app-button @click="start"
      class="btn btn-sm border-slate-300 border-2 shadow-md text-slate-600 hover:bg-green-600 hover:text-white h-[36px] w-[36px] rounded-full ml-2"
      v-if="position > 0">&#60;&#60;</app-button>
    <app-button @click="prew" class="btn btn-sm border-slate-300 border-2 shadow-md hover:bg-green-600 hover:text-white h-[36px] w-[36px] rounded-full ml-2"
      v-if="position > 0">&#60;</app-button>
    <app-button :class="{ active: item === pagination }" :key="item" @click="select(item)"
      class="bg-gray-200 border-2 border-slate-300 text-slate-600 shadow-md btn-sm hover:bg-green-600 hover:text-white h-[36px] w-[36px] rounded-full ml-2"
      v-for="item in list[position]">{{
        item }}</app-button>
    <app-button @click="next"
      class="btn btn-sm border-slate-300 border-2 shadow-md text-slate-600 hover:bg-green-600 hover:text-white h-[36px] w-[36px] rounded-full ml-2"
      v-if="position < list.length - 1">&#62;</app-button>
    <app-button @click="end"
      class="btn btn-sm border-slate-300 border-2 shadow-md text-slate-600  hover:bg-green-600 hover:text-white h-[36px] w-[36px] rounded-full ml-2"
      v-if="position < list.length - 1">&#62;&#62;</app-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const emit = defineEmits(['pagination']) // Отправляемые события

/** 
* @type Props
* @param {Number} count - Общее количество пагинаций
* @param {Number} countItems - Количество строк в таблице
*/
type Props = {
  count: any
  countItems?: number
}

/**  Установка значений по умолчанию для входных параметров */
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  countItems: 50
})

const position = ref(0) // Позиция пагинации (сдвиг)

/** Список значений пагинации  */
const list = computed(() => {
  const countListPosition = Math.ceil(props.count / props.countItems) // Получение количества сдвигов пагинации
  const listPosition = Array.from({ length: countListPosition }, (_, i) => i + 1) // Формирование массива со всем списком пагинации
  let arrPagination: number[] = [] // Массив для хранения списка пагинации сдвига
  let checkNum = 0  // Переменная для подсчета количества в блоке списка
  const result: any[] = [] // Результативный массив
  listPosition.forEach((num: number, index: number) => {
    checkNum++
    arrPagination.push(num) // Добавление номера пагинации в блок
    if(checkNum === 5 || listPosition[index] === listPosition[listPosition.length - 1]) {
      checkNum = 0
      result.push(arrPagination) // Добавление блока в список
      arrPagination = []
    }
  })
  return result
})

const pagination = ref<number>(1) // Выбранное значение пагинации

/** 
** Выбор значения пагинации
* @function select
* @param {Number} num - Значение пагинации
*/
function select(num: number) {
  pagination.value = num // Установка значения пагинации
  emit('pagination', pagination.value)
}

/** 
** Сдвиг пагинации влево
* @function prew
*/
function prew() {
  position.value--
  pagination.value = list.value[position.value][0]
  emit('pagination', pagination.value)
}

/** 
** Сдвиг списка вправо
* @function next
*/
function next() {
  position.value++
  pagination.value = list.value[position.value][0]
  emit('pagination', pagination.value)
}

/** 
** В начало списка пагинации
* @function start
*/
function start() {
  position.value = 0
  pagination.value = list.value[position.value][0]
  emit('pagination', pagination.value)
}

/** 
** В конец списка пагинации
* @function end
*/
function end() {
  position.value = list.value.length - 1
  pagination.value = list.value[position.value][list.value[position.value].length - 1]
  emit('pagination', pagination.value)
}


</script>

<style scoped>
.active {
  background: #198754;
  color: white;
}</style>