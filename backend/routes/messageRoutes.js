const express = require("express");
const isAuthenticated = require("../middleware/auth");
const { getMessagesByMatch } = require("../controllers/MessageController");
const router = express.Router();


router.get("/:matchId",isAuthenticated,getMessagesByMatch)

module.exports=router
