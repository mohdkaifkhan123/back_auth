const mongoose=require("mongoose")



mongoose.connect('mongodb://localhost:27017/authentication')
.then(()=>{
    console.log("db connected")
})
.catch((err)=>[
    console.log("err",err)
])

const user=mongoose.Schema({
    username:String,
    password:String
})

const users=mongoose.model('user',user)

module.exports=users