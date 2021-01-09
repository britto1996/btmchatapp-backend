
//import schemas

const Messages = require("../models/dbmessages")


//work with the route syncmessages

exports.syncMessages = (req,res)=>{
    Messages.find((err,data)=>{
        if(err||!data){
            return res.status(400).json({
                err:"message doesn't recieved"
            })
        }else{
            res.status(200).json({
                message:`messages recieved successfully ${data}`
            })
        }
    })
}


//work with the route messages

exports.userMessages = (req,res)=>{
    const dbmessage = req.body
    console.log(dbmessage)
    Messages.create(dbmessage,(err,data)=>{
        if(err || !data){
           return res.status(400).json({
                err:"message doesn't deliver"
            })
        }else{
            res.status(200).json({
                message:`new message created:  ${data}`
            })
        }
    })
    
}