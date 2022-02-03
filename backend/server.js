const express=require('express');
const bodyParser=require('body-parser');

const db=require('./db');

const app=express();

app.use(bodyParser.json());
// db.pool.query(`CREATE TABLE lists(
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// );`,(err,result,fields)=>{
// })
app.get('/api/hello',(req,res)=>{
    // console.log("./ hello")
    res.status(200).send({
        status:true,
        message:"hello"
    })
})

async function save_data(req,res) {
    try{
        const connection= await db.pool.getConnection();
        await connection.query('USE myapp;')
        connection.query(`INSERT INTO lists (value) VALUE("${req.body.value}")`,(err,result,field)=>{
            
            if(err) res.status(510).send("db error");
            else res.json({status:"success",value:req.body.value});
        })
        }finally{
            await connection.release();
        }
}

const get_data =async(req,res)=>{
    try{

    
        const connection=await db.pool.getConnection();
        await connection.query('USE myapp;')
        connection.query('SELECT * FROM lists;',(err,result,field)=>{
            res.json(result);
            if(err) res.status(510).send("db error");
        })
        }finally{
            await connection.release();
        }
}

// app.get('/api/values',(req,res)=>{


    // console.log("hello1");
    // db.pool.query(`USE myapp;`)
    // db.pool.query('USE myapp;',
    // (err,results,fields)=>{
    //     db.pool.query('SELECT * FROM lists;',(err,result,fields)=>{
    //         res.json(results);
    //     })
    //     if(err){
    //         return res.status(500).send("backend working1 but db");
    //     } 
    //     else return res.json(results);
    // })
// })
app.get('/api/values',get_data);
app.post('/api/value',save_data);

// app.post('/api/value',(req,res,next)=>{
    // save_data(req,res);
    // db.pool.query(`USE myapp;`);
    // db.pool.query(`INSERT INTO lists (value) VALUE("${req.body.value}")`,
    // (err,results,field)=>{
    //     // host:process.env.MYSQL_HOST,
    //     // user:process.env.MYSQL_USER,
    //     // password:process.env.MYSQL_PASSWORD,
    //     // database:process.env.MYSQL_DATABASE,
    //     // port:process.env.MYSQL_PORT
    //     if(err) return res.status(501).send("backend working2 but db");
    //     else return res.json({success:true,value:req.body.value});
    // })
// })



app.listen(5000,()=>{
    console.log("app listen on 5000");
})