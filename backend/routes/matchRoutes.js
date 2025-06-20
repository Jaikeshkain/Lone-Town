const express = require("express");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();
const MatchController=require("../controllers/matchController")

router.post("/findMatch", isAuthenticated, MatchController.findMatch);
router.get("/getMatchById",MatchController.getMatchById);

module.exports=router