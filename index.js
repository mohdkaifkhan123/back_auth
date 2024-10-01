const express=require('express')
const mongoose=require('./model/auth')
const router=require('./controller/auth')
const app=express()

app.use(express.json())

app.use(router)


app.listen(8080,()=>{
    console.log("server is running")
})