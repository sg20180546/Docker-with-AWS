const express=require('express');
const bodyParser=require('body-parser');

const db=require('./db');

const app=express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists(
    id INTEGER AUTO_INCREMENT
    value TEXT,
    PRIMARY KEY (id)
)`,(err,result,fields)=>{
    console.log("results: ",result);
})
app.get('/',(req,res)=>{
    console.log("./ hello")
    res.status(200).send({
        status:true,
        message:hello
    })
})

app.get('/api/values',(req,res)=>{
    console.log("hello1");
    db.pool.query('SELECT * FROM lists;',
    (err,results,fields)=>{
        if(err) return res.status(500).send(err);
        else return res.json(results);
    })
})

app.post('/api/value',(req,res,next)=>{
    console.log("hello2");
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err,results,field)=>{
        console.log(process.env.MYSQL_HOST)
        console.log(process.env.MYSQL_USER)
        console.log(process.env.MYSQL_PASSWORD)
        console.log(process.env.MYSQL_PORT)
        console.log(process.env.MYSQL_DATABASE)
        // host:process.env.MYSQL_HOST,
        // user:process.env.MYSQL_USER,
        // password:process.env.MYSQL_PASSWORD,
        // database:process.env.MYSQL_DATABASE,
        // port:process.env.MYSQL_PORT
        if(err) return res.status(500).send(err);
        else return res.json({success:true,value:req.body.value});
    })
})



app.listen(5000,()=>{
    console.log("app listen on 5000");
})