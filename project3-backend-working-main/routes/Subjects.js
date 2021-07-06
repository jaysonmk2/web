const express = require('express')
const router = express.Router();
const {Subjects} = require("../models")


router.get('/',async (req,res) =>{
    

    const listSubjects = await Subjects.findAll()


    if(listSubjects){
        console.log(listSubjects)
        res.status(200).send(listSubjects)
    }



})

router.post('/addsubject', async (req,res)=>{
    const subjectBody = req.body
    try{
        await Subjects.create(subjectBody).then(()=>{
            res.status(200).send({message:"success"})
        })
   
    }catch(error){
        if(error){
            console.log(error)
        }
    }
   
})

router.patch('/edit', async (req,res)=>{
    const {name,description,id} = req.body
    
    await Subjects.update({
        name: name,
        description: description},{
            where:{
                id: id
            }
        }).then(()=>{
            res.send("Updated subject successfully.")
        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        })
})

router.patch('/delete', (req,res) =>{
    
    const {subjectid} = req.body

    Subjects.destroy({
        where: {
            id: subjectid
        }
    }).then(()=>{
        res.send({message:"deleted"}).status(202)
    }).catch((err)=>{
        if(err){
            res.send(err)
        }
    })
})

module.exports = router