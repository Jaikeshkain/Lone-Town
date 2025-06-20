const jwt=require("jsonwebtoken");
const User=require("../models/UserModel");

const isAuthenticated=async(req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(401).json({message:"Unauthorized"});
        }
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

module.exports=isAuthenticated;