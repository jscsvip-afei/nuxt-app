import mysql from 'mysql2';

// Create the connection to database
// const connection =  mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'jbook',
// });
// connection.connect(()=>{
//   console.log("数据库连接成功");
// });

 const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'jbook',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

  });
// 连接池

pool.getConnection((err, connection) => {
  console.log("数据库连接成功");
})