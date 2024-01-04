import { H3Event } from 'h3'
import { db, getStrParamsSQL } from '~/server/utils/db'


export default defineEventHandler(async (event: H3Event) => {
  const params = await readBody(event) // получение параметров  
  const sql = `UPDATE public.records SET type_record=${params.type_record} WHERE id::TEXT='${params.id}'`
  await db.query(sql)
  return {
    status: 200, // Установка статуса
    typeMessage: 'success', // Установка типа сообщения
    message: 'Запись обновлена успешно' // Установка текста сообщения
  }
})
