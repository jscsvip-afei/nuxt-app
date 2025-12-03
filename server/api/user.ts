// import {getDB} from '../utils/db/mysql';
export default defineEventHandler(async (event) => {
  // @ts-ignore
  const [rows,fields] = await getDB().query('SELECT * FROM `users`');
  console.log('users',rows);
  return rows
})