const express=require("express");
require("dotenv").config();
const {MenModel} =require("../models/mens.model.js");
const {AdminModel}=require("../models/admin.model.js");
const {adminAuth}=require("../middlewares/admin.auth");

const mensRouter=express.Router();

mensRouter.get("/", async(req,res)=>{
    try{
        const mens=await MenModel.find();
        res.send(mens);
    }catch(err){
        res.send({"err in getting mens products":err})
    }
})

mensRouter.post("/create", adminAuth, async(req,res)=>{
    const payload=req.body;
    try{
        const admin=await AdminModel.find({_id:payload.adminID});
        if(admin.length>0){
            const new_men=new MenModel(payload);
            await new_men.save();
            res.send({"msg":"New product created"});
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }catch(err){
        res.send({"err in created new product":err});
    }
})

mensRouter.patch("/update/:id", adminAuth, async(req,res)=>{
    const productID=req.params.id;
    const payload=req.body;
    try{
        const admin=await AdminModel.find({_id:payload.adminID});
        if(admin.length>0){
            await MenModel.findByIdAndUpdate({_id:productID},payload)
            res.send({"msg":"Product updated"});
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }catch(err){
        res.send({"err in updated the product":err});
    }
})

mensRouter.delete("/delete/:id", adminAuth, async(req,res)=>{
    const productID=req.params.id;
    const payload=req.body;
    try{
        const admin=await AdminModel.find({_id:payload.adminID});
        if(admin.length>0){
            await MenModel.findByIdAndDelete({_id:productID});
            res.send({"msg":"Product deleted"});
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }catch(err){
        res.send({"err in deleting the product":err});
    }
})


module.exports={mensRouter};