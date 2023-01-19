const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    title:{type:String, required:true},
    avatar:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    qty:{type:Number, required:true},
    color:{type:String, required:true},
    size:{type:Number, required:true},
    userID: {type:String, required:true}
},{versionKey:false});

const OrderModel=mongoose.model("order",orderSchema);

module.exports={OrderModel};