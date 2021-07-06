const jwt = require('jsonwebtoken')
require('dotenv').config()

verifyToken = (req,res,next) =>{
    const token = req.headers['accessToken']
    if(token){
        jwt.verify(token,process.env.KEY, (err, decoded)=>{
            if(err){
                return res.status(401).json({
                    message: 'Authentication failed.',
                })
            }else{
                req.decoded =decoded
                next()
            }
        })
    }else{
        return res.status(401).json({
            message: 'Authorization failed(if token true/false)'
        })
    }
}





module.exports = verifyToken