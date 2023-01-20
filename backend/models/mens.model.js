const mongoose=require("mongoose");

const menSchema=mongoose.Schema({
    title:{type:String, required:true},
    avatar:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    offer:{type:Boolean, required:true},
    color:{type:String, required:true}
},{versionKey:false});

const MenModel=mongoose.model("men",menSchema);

module.exports={MenModel};