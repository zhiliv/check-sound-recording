import { H3Event } from 'h3'
import { db, getStrParamsSQL } from '~/server/utils/db'

export default defineEventHandler(async event => {
  const params = await readBody(event) // параметры запроса
  const sql = `INSERT INTO public.types_record (name) VALUES('${params.name}')`
  try {
    await db.query(sql)
    return {
      status: 200, // установка статуса ответа
      message: 'Запись создана успешно', // установка сообщения ответа
      typeMessage: 'success' // тип сообщения
    }
  } catch(error: any) {
    return {
      status: 500, // установка статуса ответа
      message: 'Ошибка создания записи', // установка сообщения ответа
      typeMessage: 'error' // тип сообщения
    }
  }
})
