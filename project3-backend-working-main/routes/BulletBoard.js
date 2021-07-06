const express = require('express')
const router = express.Router();
const {BulletBoard} = require("../models")
// const {validateToken} = require("../middleware/AuthMiddleware");


router.get('/',async (req,res) =>{
    

    const listBullerBoard = await BulletBoard.findAll()


    if(listBullerBoard){
        console.log(listBullerBoard)
        res.sendStatus(200)
    }



})

router.post('/addBulletBoard', async (req,res)=>{
    const BulletBoardBody = req.body
    
   await BulletBoard.create(BulletBoardBody)
   res.json(BulletBoardBody)
})

router.put('/edit', async (req,res)=>{
    const {subject,description,starttime,endtime,id} = req.body
    
    await Subjects.update({
        subject: subject,
        description: description,
        starttime: starttime,
        endtime: endtime
    
    },{
            where:{
                id: id
            }
        }).then(()=>{
            res.send("Updated BulletBoard successfully.")
        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        })
})

router.delete('/delete', (req,res) =>{
    
    const {bulletboardid} = req.body

    BulletBoard.destroy({
        where: {
            id: bulletboardid
        }
    }).then(()=>{
        res.send("Bullet Point deleted").status(202)
    }).catch((err)=>{
        if(err){
            res.send(err)
        }
    })
})

module.exports = router