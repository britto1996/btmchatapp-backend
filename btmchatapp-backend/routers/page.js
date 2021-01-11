//import express

const express = require("express")

const {userMessages,syncMessages} = require("../controllers/page")

//create router 

const router = express.Router()

router.get("/syncmessages",syncMessages)
router.post("/messages",userMessages)


module.exports = router