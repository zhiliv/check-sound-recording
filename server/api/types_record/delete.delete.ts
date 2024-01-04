import { H3Event } from 'h3'
import { db, getStrParamsSQL } from '~/server/utils/db'

export default defineEventHandler(async (event: H3Event) => {
  const params:any = await readBody(event) // Получение параметров запроса
  try {
    const sql = `DELETE FROM public.types_record WHERE id::TEXT='${params.id}'`
    await db.query(sql)
    return {
      status: 200, // установка статуса ответа
      message: 'Запись удалена успешно', // установка сообщения ответа
      typeMessage: 'success' // тип сообщения
    }
  } catch (error: any) {
    return {
      status: 500, // установка статуса ответа
      message: 'Ошибка удаления записи', // установка сообщения ответа
      typeMessage: 'error' // тип сообщения
    }
  }
})
