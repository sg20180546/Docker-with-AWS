const express=require('express');
const bodyParser=require('body-parser');

const db=require('./db');

const app=express();

app.use(bodyParser.json());
db.pool.query(`CREATE TABLE lists(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
);`,(err,result,fields)=>{
})
app.get('/api/hello',(req,res)=>{
    res.status(200).send({
        status:true,
        message:"hello"
    })
})





app.get('/api/values',(req,res)=>{


        db.pool.query('SELECT * FROM lists;',(err,result,fields)=>{
            if(err){
                return res.status(500).send("backend working1 but db");
            } 
            else return res.json(result);
        })

})


app.post('/api/value',(req,res,next)=>{
    db.pool.query(`INSERT INTO lists (value) VALUE("${req.body.value}");`,
    (err,results,field)=>{
        if(err) return res.status(501).send("backend working2 but db");
        else return res.json({success:true,value:req.body.value});
    })
})



app.listen(5000,()=>{
    console.log("app listen on 5000");
})