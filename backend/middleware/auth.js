const jwt=require("jsonwebtoken");
const User=require("../models/UserModel");

const isAuthenticated=async(req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(401).json({message:"Unauthorized"});
        }
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.user={
            id:user._id,
            name:user.name,
            email:user.email
        };
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

module.exports=isAuthenticated;