import { H3Event } from 'h3'
import { db } from '~/server/utils/db'
import fs from 'fs'
import moment from 'moment'
import clc from 'cli-color'


interface Data {
  filename: string
  path: string
  path_date: string
  name: string
  created_record: string
  created_at: string

}


/** 
** Получение списка директорий
* @async
* @function getDirs
* @return {string[]}
*/
const getDirs = async () => {
  const path = './public/records/' // Путь для проверки
  const result: string[] = [] // Массив имен папок
  await fs.readdirSync(path).forEach(async (el: string) => { // Получение всех файлов и папок в биректории
    if(fs.statSync(`${path}${el}`).isDirectory()) { // Проверка на то что это папка
      result.push(el)
    }
  })
  return result
}


/** 
** Проверка наличия записи в БД
* @function checkDataDB
* @param {String} filename - Имя файла
*/
const checkDataDB = async (filename: string) => {
  const sql = `SELECT * FROM public.records WHERE filename='${filename}'`
  const res = await db.query(sql)
  return res.rowCount
}

/** 
** Формирование списка для добавления
* @function getFilesDir
* @param {Array} listDir - Список директорий
*/
const getFilesDir = async (listDir: string[]) => {
  return new Promise(async (resolve, reject) => {
    let path = './public/records/' // Путь для проверки
    const result: Data[] = [] // Результативный массив
    await listDir.forEach(async (dir: string, indexDir: number) => {
      const listFiles = await fs.readdirSync(`${path}${dir}`)
      listFiles.forEach(async (file: string, indexFile: number) => {
        if(fs.statSync(`${path}${dir}/${file}`).isFile()) { // Проверка на то что это папка
          const arr: any = [
            file.split('.')[0], // name
            file, // filename
            moment(file.split('_')[1].split('.')[0], 'YYYY-MM-DD HH-mm-ss').format('YYYY-MM-DD HH:mm:ss'), // created_record
            moment().format('YYYY-MM-DD HH:mm:ss'), //created_at
            `${path}${dir}/${file}`, //path
            file.split('_')[1].split(' ')[0], //path_date
            // await fs.readFileSync(`${path}${dir}/${file}`).buffer //bufferы
          ]
          if(await checkDataDB(file) === 0) {
            result.push(arr)
          }
        }
        if(indexDir === listDir.length - 1 && indexFile === listFiles.length - 1) {
          resolve(result)
        }
      })
    })
  })

}


export default defineEventHandler(async (event: H3Event) => {
  // const res = await db.query('SELECT * FROM records')
  console.log(clc.green('Начало загрузки'))
  const listDirs = await getDirs() // Получение списка папок
  const values: any = await getFilesDir(listDirs)
  console.log('Для загрузки: ', values.length)
  let index = 0
  for await(const row of values){
    index++
    const sql = 'INSERT INTO public.records(name, filename, created_record, created_at, path, path_date) VALUES($1, $2, $3, $4, $5, $6)'
    await db.query(sql, row)
    console.log('Добавлено: ', index, values.length)
  }
  
  console.log(clc.green('Загрузка завершена'))
  return values.length
})