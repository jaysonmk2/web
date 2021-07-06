const { response } = require('express');
const express = require('express')
const router = express.Router();
const {Rooms} = require("../models")



router.post('/addroom',(req,res)=>{
   const {name,description,subjectid} = req.body


   try{
       Rooms.create({
           name: name,
           description:description,
           SubjectId: subjectid
       }).then(()=>{
           res.status(200).send({message:"Subject Added successfuly."})
       }).catch((err)=>{
           console.log(err)
       })
   }catch(error){
       console.log(error)
   }

})

router.get('/listrooms',async (req,res)=>{
    
    try{
       const room = await Rooms.findAll()
       res.status(200).send(room)

    }catch(error){
        console.log(error)
    }
})


router.patch('/deleteroom',async (req,res)=>{
    try{
        const {roomid} = req.body
        Rooms.destroy({
            where:{id: roomid}
        }).then(()=>{
            res.send({message:'success'})
        })
    }catch(error){
        res.status(500).send({message:'Internal server error. Please try again later...'})
    }
})







module.exports = router;