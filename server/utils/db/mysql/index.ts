import mysql, { Pool } from 'mysql2/promise';


 const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'jbook',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
// 导出连接池的 Promise API 以便在其他地方使用
export const getDB = (): any  => {
  return pool;
}