import { H3Event } from 'h3'
import { db, getStrParamsSQL } from '~/server/utils/db'

export default defineEventHandler(async (event: H3Event) => {
  const params: any = getQuery(event)
  const sql = `SELECT r.name as name, r.filename as filename, r.seconds as seconds, r.created_record as created_record, r.text as text, r.created_at as created_at, r.path as path, r.path_date as path_date, r.buffer as buffer, r.type_record, tr.name as type_record_name FROM public.records r
  LEFT JOIN public.types_record tr ON tr.id = r.type_record
  WHERE r.id::TEXT='${params.id}'`
  const res = await db.query(sql)
  return res.rows[0]
})
