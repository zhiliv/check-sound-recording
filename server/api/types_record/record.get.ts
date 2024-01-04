import { H3Event } from 'h3'
import { db, getStrParamsSQL } from '~/server/utils/db'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = getQuery(event)
  const sql = `SELECT * FROM public.types_record WHERE id::TEXT='${params.id}'`
  const res = await db.query(sql)
  return res.rows[0]
  
})
