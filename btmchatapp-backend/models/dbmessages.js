//import mongoose

const mongoose = require("mongoose")

//creating schemas

const messagesSchema = new mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    recieved:Boolean
},{timestamps:true})

module.exports = mongoose.model("messages",messagesSchema)