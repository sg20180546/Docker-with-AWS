const mysql=require('mysql');
const pool=mysql.createPool({
    connectionLimit:10,
    host:"docker-sg20180546.cnio27em9obt.us-east-1.rds.amazonaws.com",
    user:"root",
    password:"asdf3179",
    database:"myapp",
    port:3306
})
exports.pool =pool;