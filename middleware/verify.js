const jwt=require('jsonwebtoken')

const verify=(req,res,next)=>{

    const data = req.header('Authorization').split(" ")[1];
    console.log(data)
    try{
   
        jwt.verify(data,'53e15edd38b5976ca88133ed6a2dbd1708ec5ef14a7eedca6b2fa3b6873c4014')
     
        next()

    }catch(err){
        return res.status(500).json('Error')
    }

}
module.exports=verify