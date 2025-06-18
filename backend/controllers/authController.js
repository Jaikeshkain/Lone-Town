const User = require("../models/UserModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")


//register logic
exports.register = async (req,res)=>{
    const {name,email,password,traits}=req.body;
    try {
        if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required." });
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"This email is already registered"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({name,email,password:hashedPassword,traits});
        res.status(201).json({message:"User created successfully",user:newUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}

//login logic
exports.login = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({message:"Login Successfully",userData:{
            id:user._id,
            name:user.name,
            email:user.email,
            token:token
        }});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }
}
