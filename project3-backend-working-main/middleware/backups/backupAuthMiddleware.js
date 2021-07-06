const {JsonWebTokenError} = require('jsonwebtoken');
const {sign, verify} = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.KEY

const createTokens = (user) =>{
    const accessToken = sign(
        {
            firstname: user.firstname,lastname: user.lastname, id:user.id,usertype: user.usertype, userstatus: user.userstatus
        },
            key
    )
    return accessToken;
}

const validateToken = (req,res,next) =>{
    const accessToken = req.cookies["access-token"];

    if(!accessToken) {
        return res.json({error: "User is not logged in."})
    }
    try{

        
        const validToken = verify(accessToken,"lab1234")
      
        if (validToken){
            req.authenticated =true;
            return next();
       }

    }catch(err){
        return res.json({error: err})
    }

}

module.exports = {validateToken, createTokens}