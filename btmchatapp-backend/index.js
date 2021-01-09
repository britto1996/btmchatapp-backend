//import express
const express = require("express")
const app = express()

//port number

const port = 5000

//first api response

app.get("/test",(req,res)=>{
    res.send("fuck")
})

app.listen(port,()=>{
    console.log(`server is running on the port ${port}`)
})

//db connection

// mongodb+srv://admin:<password>@cluster0.wgjmp.mongodb.net/<dbname>?retryWrites=true&w=majority

//

