require("dotenv").config();
const jwt=require("jsonwebtoken");

const userAuth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,process.env.key);
        if(decoded){
            req.body.userID=decoded.userID;
            // req.body.userName=decoded.userName;
            next();
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }else{
        res.send({"msg":"You are not authorized"});
    }
}

module.exports={userAuth};