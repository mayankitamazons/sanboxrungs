const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

// console.log('db connection',connection);
var pool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  debug: false,
  port: 3306,
});
module.exports = pool;
