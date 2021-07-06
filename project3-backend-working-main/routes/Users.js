const express = require('express')
const router = express.Router();
const {Users} = require("../models")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken')
require('dotenv').config()
const auth = require('../middleware/Auth')



router.post('/', async (req,res)=>{
    const {email,password,firstname,lastname,phonenumber,address,usertype} = req.body
    // insert into users values(?,?,?,?,?,?,?) []
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            email: email,
            password: hash,
            usertype: usertype,
            firstname: firstname,
            lastname: lastname,
            address: address,
            phonenumber: phonenumber,
            userstatus: 1
        }).then(()=>{
            res.send("User registerd successfuly!");
        }).catch((err)=>{
            res.send(err)
            
        })
        
    })
})



router.post('/login',async (req,res)=>{
    const{email,password} = req.body;
   try{

        const user = await Users.findOne({where:{email:email}})
        if(!user) return res.status(404).json({message: "User doesn't exist."})

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) return res.status(400).send({message:"Invalid credentials."})

        const token = jwt.sign({
            firstname: user.firstname,
            lastname: user.lastname, 
            id:user.id,
            usertype: user.usertype, 
            userstatus: user.userstatus,
            address: user.address,
            phonenumber: user.phonenumber,

        }, process.env.KEY,{
            expiresIn: "30m"
        });

        // res.status(200).json({success:true, token})
        sendToken(200,res,token)
   } catch(error){
       if(error){
           res.status(500).send({message: error})
       }
   }
   
})

router.patch('/changepassword', async (req,res)=>{
    
    const {oldPassword, newPassword, userid } = req.body
    try{

        const user = await Users.findOne({where:{id: userid}})
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword,user.password)
        if(!isOldPasswordCorrect) {
            return res.status(403).send({message:"badoldpassword"})
        }else{
            bcrypt.hash(newPassword,10).then((hashedPassword)=>{
                user.update(
                    {password: hashedPassword},
                    {where:{id: userid}})
            }).then(()=>{
                res.status(200).send({message:"Success."})
            })
        }
    }catch(error){
        if(error){
            console.log(error)
            res.status(500).send('Please try again later')

        }
    }

    
})

router.patch('/editdetails',async (req,res)=>{
    const {address,phonenumber,userid,password} = req.body

    try{
        const user = await Users.findOne({where:{id: userid}})
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword){
            return res.status(401).send({message: "wrongPassword"})
        }else{
            user.update(
                {
                    address: address,
                    phonenumber: phonenumber,
                },{where:{id:userid}}
            ).then(()=>{
                res.status(200).send({message:"success"})
            })
        }
    }catch(error){
        if(error){
            console.log(error)
            res.status(500).send({message:"internal server error."})
        }
    }
})

const sendToken = (statusCode, res,token) => {
  
  res.status(statusCode).json({ sucess: true, token });
};

module.exports = router