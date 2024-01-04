import postgres from 'pg'
const { Client } = postgres
const config = useRuntimeConfig()

export const db = new Client({
  user: config.database.username,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: 5432, // Default PostgreSQL port
})
db.connect()

export const getStrParamsSQL = (params:any) => {
  let sql =''
  if(params.where) {
    const where = JSON.parse(params.where)
    Object.keys(where).forEach((key, index) => {
      if(index === 0) {
        let  value = `WHERE ${key}::TEXT `
        if(where[key].type === 'LIKE'){
          value += ` LIKE %'${where[key].value}'%`
        }
        else 
          sql += ` WHERE ${key}::TEXT ${where[key].type} '${where[key].value}' `
      }
      else {
        let value = ` WHERE ${key}::TEXT `
        if(where[key].type === 'LIKE') {
          value += ` AND LIKE %'${where[key].value}'%`
        }
        else
        sql += ` AND ${key}::TEXT ${where[key].type} '${where[key].value}' `
      }
    })
    
  }
  if(!params.order && params.limit) {
    sql += ` ORDER BY id `
  }
  if(params.limit)
  sql += ` LIMIT ${params.limit} OFFSET ${params.offset} `
  
  return sql
}


