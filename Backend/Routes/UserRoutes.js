const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("../middleware");
const {jsonPassword} = require("../password");
const {User} = require("../Database");
const {userSigninSchema,userLoginSchema} = require("../zod");

router.use(express.json())

router.post("/signup",async (req,res)=>{
    const body = req.body;

    //Input Validation
    const response = userSigninSchema.safeParse(body);
    if(!response.success){
        return res.status(401).json({
            error:"Invalid Inputs"
        })
    }
    //Checking if the username already exists
    const existingUser = await User.findOne({username:body.username});
    if(existingUser){
        return res.status(404).json({
            error:"Username already taken"
        })
    }else{
        const user = await User.create(body);
        const token = jwt.sign({_id:user._id},jsonPassword,{expiresIn:"1h"});
        return res.json({
            msg:"User created successfully",
            token: token
        })
    }
})

router.post("/login",async (req,res)=>{
    const body = req.body;

    const response = userLoginSchema.safeParse(body);
    if(!response.success){
        return res.status(401).json({
            error:"Invalid Inputs"
        })
    }

    const user = await User.findOne({username:body.username});
    if(!user || user.password != body.password){
        return res.status(401).json({
            error: "Username or Password Incorrect"
        })
    }
    const token = jwt.sign({_id:user._id},jsonPassword,{expiresIn:"1h"});
    return res.json({
        msg:"Logged in successfully",
        token: token
    })
})

module.exports = router