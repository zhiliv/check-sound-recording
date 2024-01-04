<template>
  <div class="p-2 flex flex-col md:flex-row w-full">
    <div class="w-full">
      <input
        @change="handleInputChange"
        accept="image/*"
        class="file-input file-input-bordered file-input-warning w-full file-input-sm max-md:ml-2 mt-1"
        label="Upload"
        type="file"
      />
      <img
        :class="{ 'border-2': selectedImageObjectUrl }"
        :src="selectedImageObjectUrl"
        class="mt-2"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['file']) // Отправляемые события

/** 
** Описание сущности данных формы
* @type Data 
* @param {String} name - Имя файла
* @param {String} file - Данные файла
*/
type Data = {
  lastModified: number | null
  lastModifiedDate: Date | null
  name: string | null
  size: number | null
  type: string | null
  webkitRelativePath: string | null
}

const dataDefault: Data = {
  lastModified: null,
  lastModifiedDate: null,
  name: null,
  size: null,
  type: null,
  webkitRelativePath: null
}

/** 
** Данные формы
* @param {String} name - Наименование
*/
const data: any = ref(dataDefault)
const selectedImageObjectUrl = ref<string>()

/** 
** При выборе файла
* @function handleInputChange
* @param {Object} event - Данные события
*/
async function handleInputChange(event: Event | any) {
  data.value = event?.target?.files[0] // Получение данных файла
  console.log('🚀 -> handleInputChange -> data.value:', data.value)
  selectedImageObjectUrl.value = URL.createObjectURL(data.value) // Отображение изображения  дял предпросмотра
  emit('file', data.value)
}
</script>