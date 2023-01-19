const express=require("express");
require("dotenv").config();
const {CartModel} =require("../models/cart.model.js");
const {userAuth}=require("../middlewares/user.auth.js");

const cartRouter=express.Router();

cartRouter.get("/", userAuth, async(req,res)=>{
    const userID=req.body.userID;
    try{
        const items=await CartModel.find({userID});
        res.send(items);
    }catch(err){
        res.send({"err in getting all cart items":err});
    }
})

cartRouter.post("/create", userAuth, async(req,res)=>{
    const payload=req.body;
    console.log(payload);
    try{
        const item=await CartModel.find({productID:payload.productID});
        if(item.length==0){
            const item= new CartModel(payload);
            item.save();
            res.send({"msg":"Product added to Cart"});
        }else{
            res.send({"msg":"Product already available in Cart"});
        }
    }catch(err){
        res.send({"err in adding item to cart":err});
    }
})


cartRouter.patch("/update/:id", userAuth,async(req,res)=>{
    const ID=req.params.id;
    const payload=req.body;
    try{
        const item=await CartModel.findOne({_id:ID});
        const userID_in_item=item.userID;
        const userID_req=req.body.userID;
        if(userID_in_item==userID_req){
            await CartModel.findByIdAndUpdate({_id:ID},payload);
            res.send({"msg":"Cart Updated"});
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }catch(err){
        res.send({"err in updating cart data":err});
    }
})


cartRouter.delete("/delete", userAuth,async(req,res)=>{
    try{
        const item=await CartModel.findOne({});
        const userID_in_item=item.userID;
        const userID_req=req.body.userID;
        if(userID_in_item==userID_req){
            await CartModel.findByIdAndDelete();
            res.send({"msg":"Cart Emptied"});
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }catch(err){
        res.send({"err in updating cart data":err});
    }
})


cartRouter.delete("/delete/:id", userAuth, async(req,res)=>{
    const ID=req.params.id;
    try{
        const item=await CartModel.findOne({_id:ID});
        const userID_in_item=item.userID;
        const userID_req=req.body.userID;
        if(userID_in_item==userID_req){
            await CartModel.findByIdAndDelete({_id:ID});
            res.send({"msg":"Cart Item Deleted"});
        }else{
            res.send({"msg":"You are not authorized"});
        }
    }catch(err){
        res.send({"err in updating cart data":err});
    }
})

module.exports={cartRouter};