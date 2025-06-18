const express = require("express");
const router = express.Router();
const stateController = require("../controllers/stateController");
const isAuthenticated = require("../middleware/auth");

router.get("/getState", isAuthenticated, stateController.getUserState);
router.patch("/unpinMatch", isAuthenticated, stateController.unpinMatch);

module.exports=router

