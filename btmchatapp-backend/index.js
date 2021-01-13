//import express

const express = require("express");
const app = express();

//import route pages

const routePages = require("./routers/page")

//import middlewares

let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let cors = require('cors')

//use all the middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//import environment config files for secure purpose

require("dotenv").config();

//port number

const port = process.env.PORT || 5000;






//import mongoose to access schema models

const mongoose = require("mongoose");



//db connection

mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.wgjmp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(()=>console.log("DB CONNECTED"));

//retrieve the contents stored in mongodb

const db = mongoose.connection

//import pusher

const Pusher = require("pusher")

const pusher = new Pusher({
  appId: "1135917",
  key: "5415468845a9fe175b94",
  secret: "a0dda34c3c109607d1af",
  cluster: "ap2",
  useTLS: true
})

//securing the messages



db.once("open",()=>{
  const msgCollection = db.collection('messages')
  const changeStream = msgCollection.watch()

  changeStream.on("change",(change)=>{
    console.log("A change occures",change)

    if(change.operationType === 'insert'){
      const messageDetails = change.fullDocument

      pusher.trigger('messages','inserted',{
        printing:console.log("pusher is triggered"),
        name:messageDetails.name,
        message:messageDetails.message,
        // printmsg:console.log(messageDetails.message)
        timestamp:messageDetails.timestamp,
        recieved:messageDetails.recieved


      })
    }
    else{
      console.log("Error triggering pusher")
    }
  })
})




//first api response

app.use("/api",routePages)


app.get("/test", (req, res) => {
  res.send("fuck");
});

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});


