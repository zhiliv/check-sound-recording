<template>
  <div class="carousel w-full block-carousel mt-2 pb-2  shadow-md shadow-zinc-300 rounded-lg border">
    <h4 class="text-center w-full justify-center pt-16" v-if="(!images || !images.length && isLoad) || getCountIsDel() === images.length">Изображения отсутствуют
    </h4>
    <div class="flex w-full justify-center" v-if="!isLoad">
      <app-spinner />
    </div>

    <div :id="geIdImage(index)" :key="index" class="carousel-item w-full flex justify-center" v-for="(image, index) in images">
      <nuxt-img :class="{ 'border-green-600': image.isActive, 'border-4': image.isActive }" :src="image.path" @click="select(index)" class="carousel-img"
        format="webp" v-if="(!image?.isNew && image.path) && !image.isDel" />
      <img :src="getImageUrl(image)" @click="select(index)" class="mt-2 carousel-img" v-if="image.isNew" />
      <app-button @click="del(index)" v-if="!image.isDel" class="btn-xs ml-2 btn-error hover:bg-red-500">X</app-button>
    </div>
  </div>

  <div class="flex justify-center w-full py-2 gap-2 relative mb-4">
    <template v-for="(item, index) in images">
      <a :class="{ 'btn-success': item.isActive }" :href="getIdLink(index)" :key="item.id" class="btn btn-xs" v-if="!item.isDel">{{ index + 1 }}</a>
    </template>
  </div>
  <div class="flex w-full justify-center">
    <app-button @click="add" class="standart btn-primary text-white ring ring-blue-100 w-40">Добавить</app-button>
  </div>
</template>

<script lang="ts" setup>
const isLoad = ref(false)

/** 
** Вывод изображения в превью
* @function getImageUrl
* @param {Object} data - Входные
*/
const getImageUrl = (data: any) => {
  return URL.createObjectURL(data.file)
}

/**
 ** Описание свойств изображения
 * @type
 * @param {String} id - Идентификатор
 * @param {String} path - Ссылка на изображение
 * @param {String} label - Подпись изображения
 * @param {String} fileName - Имя файла
 * @param {Boolean} isNew - Признак нового изображения
 * @param {Boolean} isActive - Признак выделенного изображения
 * @param {Boolean} isDel - Признак удаляемого изображения
 */
type Image = {
  id: string
  path: string
  label: string
  fileName: string
  isNew?: true
  isActive?: true
  isDel?: true
}

/**
 ** Описание входных параметров
 * @type Props
 * @param {Array<Image>} images - Список изображений
 */
type Props = {
  images?: Image[] | any
}
const emit = defineEmits(['update']) // Список отправляемых событий

/* Входные свойства  */
const props = withDefaults(defineProps<Props>(), {
  images: []
})

const images: Image[] | any = ref(props.images) // Переменная со списком изображений

/**
 ** Отправка события о загрузке файла
 * @function add
 */
async function add() {
  const body: any = await showModal('add_image', {
    options: {
      title: 'Загрузка изображения',
      width: '20%',
      isDrawer: true,
      buttons: { add: true, cancel: true },
    },
  }) // Получение ответа из модального окна
  if(body) {
    body.isNew = true
    images.value.push(body)
  }
}

/**
 ** Установка идентификатора изображения
 * @function geIdImage
 * @param {Number} index - Порядковый номер
 */
const geIdImage = (index: number) => `image_${index + 1}`

/**
 ** Получение идентификатора элемента ссылки для перехода по изображения
 * @function getIdLink
 * @param {Number} index - Порядковый номер
 */
const getIdLink = (index: number) => `#image_${index + 1}`

watch(() => images, (newVal) => {
  if(images) isLoad.value = true
  emit('update', newVal)
})

/** 
** Получение количества изображений с признаком удаления
* @function getCountIsDel 
*/
const getCountIsDel = () => {
  return images.value.filter((el: any) => el.isDel)
}


onMounted(() => {
  isLoad.value = true // Установка признака загрузки формы
})

/** 
** Удаление изображения
* @function del
* @param {Object} image - Данные изображения
*/
async function del(index: number) {
  const text = images.value[index].isActive ? 'Внимание! Данная запись является главной для записи, действительно удалить?' : 'Подтвердите удаление записи?'
  const body: any = await showModal('modal_confirm', { options: { title: 'Удалить запись?', width: '25%', isDrawer: false, buttons: { cancel: false, yes: true, no: true }, text } }) // Получение ответа из модального окна
  if(body) {
    images.value[index]?.isNew ? images.value.splice(index, 1) : images.value[index].isDel = true
  }
}


/** 
** Установка активного элемента
* @function select
* @param {Object} image - Данные изображения
*/
function select(index: number) {
  images.value.map((el: Image) => {
    delete el.isActive
    return el
  })
  images.value[index].isActive = true
}
</script>

<style scoped>
@media (max-width: 767.9px) {
  .block-carousel {
    height: 200px;
  }
}

@media (min-width: 768px) {
  .block-carousel {
    height: 350px;
  }
}

.carousel-img {
  max-width: 92%;
}
</style>