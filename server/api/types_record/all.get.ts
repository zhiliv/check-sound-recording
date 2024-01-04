import { H3Event } from 'h3'
import { db, getStrParamsSQL } from '~/server/utils/db'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = getQuery(event)
  let sql: string = `SELECT id, name FROM public.types_record `
  sql += getStrParamsSQL(params)
  const res = await db.query(sql)
  return res.rows
})