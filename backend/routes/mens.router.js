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

mensRouter.get("/filter", async(req,res)=>{
    const query=req.query;
    let category=query.category;
    let color=query.color;
    let mens;
    try{
        if(category && color){
            mens=await MenModel.find({$and:[{category:{$regex:category,$options:"i"}},{color:{$regex:color,$options:"i"}}]});  
        }else if(category){
            mens=await MenModel.find({category:{$regex:category,$options:"i"}})
        }else if(color){
            mens=await MenModel.find({color:{$regex:color,$options:"i"}})
        }else{
            mens=await MenModel.find();
        }       
        res.send(mens);
    }catch(err){
        res.send({"err in getting filtered products":err})
    }
})

mensRouter.get("/exc", async(req,res)=>{
    try{
        const mens1=await MenModel.find({offer:true});
        res.send(mens1);
    }catch(err){
        res.send({"err in getting mens products":err});
    }
})

mensRouter.get("/sort", async(req,res)=>{
    let query=req.query;
    let mens;
    try{
        if(query.sort=="lth"){
            mens=await MenModel.find().sort({price:1});
        }else if(query.sort=="htl"){
            mens=await MenModel.find().sort({price:-1});
        }else if(query.sort=="asc"){
            mens=await MenModel.find().sort({title:1});
        }else if(query.sort=="desc"){
            mens=await MenModel.find().sort({title:-1});
        }else{
            mens=await MenModel.find();
        }
        res.send(mens);
    }catch(err){
        res.send({"err in getting mens products":err});
    }
})

mensRouter.get("/search", async(req,res)=>{
    let query=req.query;
    try{
        const mens=await MenModel.find({title:{$regex:query.q,$options:"i"}});
        res.send(mens);
    }catch(err){
        res.send({"err in getting mens products":err});
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