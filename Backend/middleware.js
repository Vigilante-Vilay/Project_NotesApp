const jwt = require("jsonwebtoken");
const {jsonPassword} = require("./password");
const { json } = require("express");

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json({
            error: "Token Missing"
        })
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,jsonPassword);
        req.userId = decoded._id;
        next();
    }catch{
        return res.statud(403).json({
            error:"Invalid Token"
        })
    }
}

module.exports={
    authMiddleware
}
