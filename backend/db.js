const mysql=require('mysql');
const pool=mysql.createPool({
    connectionLimit:10,
    host:'mysql',
    user:'root',
    password: "asdf3179",
    database:'myapp',
    port:3306
})
exports.pool =pool;