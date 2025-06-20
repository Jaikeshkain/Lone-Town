const express=require("express")
const router=express.Router()
const authController =require("../controllers/authController");
const isAuthenticated = require("../middleware/auth");

router.post("/register",authController.register)
router.post("/login", authController.login);
router.get("/getUser", isAuthenticated, authController.getUserData);

// check token is valid
router.get("/check", isAuthenticated, (req, res) => {
  return res.status(200).json({ valid: true });
});

router.post("/logout",authController.logout)



module.exports=router