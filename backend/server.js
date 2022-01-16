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
    console.log("results: ",results);
})

app.get('/api/values',(req,res)=>{
    db.pool.query('SELECT * FROM lists;',
    (err,results,fields)=>{
        if(err) return res.status(500).send(err);
        else return res.json(results);
    })
})

app.post('/api/value',(req,res,next)=>{
    db.pool.query(`INSERT INTO lists (value) VALUES(${req.body.value})`,
    (err,results,field)=>{
        if(err) return res.status(500).send(err);
        else return res.json({sucess:true,value:req.body.value});
    })
})



app.listen(5000,()=>{
    console.log("app listen on 5000");
})