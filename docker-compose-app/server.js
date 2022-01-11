const express=require('express');
const redis=require('redis');

const client=redis.createClient({
    host: "redis-server",
    port: 6379
})
const app=express();
app.listen(8080);

client.set("number",0);

app.get('/',(req,res)=>{
    client.get("number",(err,number)=>{
        client.set("number",parseInt(number)+1);
        res.send("안녕하세여! "+number)
    })
})
