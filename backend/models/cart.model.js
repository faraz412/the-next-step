const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    title:{type:String, required:true},
    avatar:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    qty:{type:Number, required:true},
    color:{type:String, required:true},
    size:{type:Number, required:true},
    userID: {type:String, required:true},
    productID : {type:String, required:true}
},{versionKey:false});

const CartModel=mongoose.model("cart",cartSchema);

module.exports={CartModel};