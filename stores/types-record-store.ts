import { defineStore } from 'pinia'
import { Query } from '~/types/query'

/**
 * @interface QueryParams
 * @member {Number} offset - Сдвиг записей
 * @member {Number} limit - Количество записей
 * @member {Object} where - Условия отбора записи
 * @member {String} order - Поле сортировки
 */
type SelectParams = {
  offset?: number | any
  limit?: number | any
  where?: any
  order?: string
}

export const useTypesRecordStore = defineStore('typesRecord', () => {
  const list = ref<any>([]) // Список строк таблицы
  const count = ref<number>(0) // Общее количество
  const loading = ref<boolean>(true) // Статус загрузки
  const error = ref<any>(true) // Данные об ошибке
  const limit = ref<number>(50) // Лимит выбора строк
  const offset = ref<number>(0) // Сдвиг
  const selectParams = ref<SelectParams>({ offset, limit, order: JSON.stringify([]) }) // Параметры для запроса
  const where = ref<any>({}) // Условия отбора данных
  const filterCondition = ref<any>() // Данные фильтрации
  const table = ref<string>('types_record') // Получение наименования категории(таблицы)

  /**
   * Назначение условий отбора
   * @function setFilter
   * @param {String} key - Наименование ключа условий отбора
   * @param {String} value - Значение условий отбора
   * @param {String} filterCondition - тип фильтрации
   */
  async function setFilter(key: string, value: any, filterCondition: string) {
    if(!value) delete where.value[key]
    // Удаляем из объекта свойство, если поле поиска пустое

    else {
      let typeFilter: string // Значение фильтра
      if(filterCondition === '>') typeFilter = '>'
      else if(filterCondition === '<') typeFilter = '<'
      else if(filterCondition === '%') typeFilter = 'LIKE'
      else if(filterCondition === '=') typeFilter = '='
      else typeFilter = '='
      where.value[key] = { type: typeFilter, value }
    }

    await getList()
  }

  /**
   * Получение списка всех категорий
   * @function getList
   * @param {String} _url - Ссылка для api
   */
  async function getList() {
    let url = `/api/types_record/all?limit=${selectParams.value.limit}&offset=${selectParams.value.offset}&order=${selectParams.value.order}&table=${table.value}`
    if(!checkEmptyObject(where.value)) url += `&where=${JSON.stringify(where.value)}`
    try {
      loading.value = true
      const paramsQuery: Query = {
        url, // TODO добавить параметры фильтрации
        method: 'get'
      }
      let response: any = await query(paramsQuery) // Отправка запроса на удаление
      await getCount()
      
      list.value = Array.isArray(response.data.value) ? response.data.value  :  []  // Отправка запроса на удаление
    } catch(err: any) {
      error.value = err.value ? true : false // Установка статуса ошибки
      err.value ? showToast({ message: err.value.data.message, type: 'error' }) : (loading.value = false)
    }
  }

  /**
   * Получение общего количества записей
   * @function getCount
   * @param {String} _url - Ссылка для api
   */
  async function getCount() {
    let url = !checkEmptyObject(where.value) ? `/api/types_record/count?where=${JSON.stringify(where.value)}&table=${table.value}` : `/api/types_record/count?table=${table.value}` // Проверка на наличие дополнительных параметров получения количества
    try {
      const paramsQuery: Query = {
        url, // TODO добавить параметры фильтрации
        method: 'get'
      }
      let response: any = await query(paramsQuery) // Отправка запроса на удаление
      count.value = response.data.value || 0 // Отправка запроса на удаление
    } catch(err: any) {
      error.value = err.value ? true : false // Установка статуса ошибки
      err.value ? showToast({ message: err.value.data.message, type: 'error' }) : (loading.value = false)
    }
  }

  /** 
  * Редактирование записи
  * @function editRecord
  * @param {Object} data - Данные для добавления
  * @param {String} _url - Ссылка для api
  */
  async function editRecord(data: any) {
    data.table = table.value // Установка параметра имени таблицы
    const paramsQuery: Query = { url: `/api/types_record/edit`, method: 'post', body: data } // параметры запроса
    try {
      let response: any = await query(paramsQuery) // Отправка запроса на редактирование данных
      await getList()
      return response.data
    }
    catch(err: any) {
      error.value = err?.value ? true : false // Установка статуса ошибки
      showToast({ message: err?.value?.data?.message || err, type: 'error' })
    }
  }

  /** 
  * Получение данных записи 
  * @function getRecord
  * @param {Number} id - Идентификатор для получения записи
  * @param {String} _url - Ссылка для api
  */
  async function getRecord(id: number) {
    const paramsQuery: Query = { url: `/api/types_record/record?id=${id}&table=${table.value}`, method: 'get' } // параметры запроса
    try {
      let response: any = await query(paramsQuery) // Отправка запроса на получение данных
      return response.data
    }
    catch(err: any) {
      error.value = err.value ? true : false // Установка статуса ошибки
      showToast({ message: err.value.data.message, type: 'error' })
    }
  }
  

  /** 
  * Удаление записи
  * @function deleteRecord
  * @param {Object} data - Данные для удаления
  * @param {String} _url - Ссылка для api
  */
  async function deleteRecord(data: any) {
    data.table = table.value // Наименование таблицы
    const paramsQuery: Query = { url: `/api/types_record/delete`, method: 'delete', body: data } // параметры запроса
    
    try {
      let response: any = await query(paramsQuery) // Отправка запроса на удаление
      await getList()
      return response.data
    }
    catch(err: any) {
      error.value = err.value ? true : false // Установка статуса ошибки
      showToast({ message: err.value.data.message, type: 'error' })
    }
  }
  
  /** 
* Добавление новой записи
* @function addNewRecord
* @param {Object} data - Данные для добавления
* @param {String} _url - Ссылка для api
*/
  async function addNewRecord(data: any) {
    data.table = table.value // Установка параметра имени таблицы
    const paramsQuery: Query = { url: `/api/types_record/add`, method: 'put', body: data } // параметры запроса
    try {
      let response: any = await query(paramsQuery) // Отправка запроса на добавление данных
      await getList()
      return response.data
    }
    catch(err: any) {
      error.value = err.value ? true : false // Установка статуса ошибки
      showToast({ message: err.value.data.message, type: 'error' })
    }
  }

  return { list, loading, error, getList, setFilter, getCount, count, limit, offset, filterCondition, getRecord, editRecord, deleteRecord, table, addNewRecord }
})
