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

const port = process.env.PORT;

//import pusher

const Pusher = require("pusher");

//adding pusher for real time use

const pusher = new Pusher({
  appId: "1135444",
  key: "dd134867654a1256e459",
  secret: "1da03efbb4eeddfd8b2d",
  cluster: "ap2",
  useTLS: true
});

//import mongoose to access schema models

const mongoose = require("mongoose");

//db connection

mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.wgjmp.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(()=>console.log("DB CONNECTED"));

//retrieve the contents stored in mongodb

const db = mongoose.connection

const msgCollection = db.collection("messages")
console.log(msgCollection)

const changeStream = msgCollection.watch();
changeStream.on("change",(change)=>{
  console.log("A change occured",change)
})

//first api response

app.use("/api",routePages)

app.get("/test", (req, res) => {
  res.send("fuck");
});

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});

//
