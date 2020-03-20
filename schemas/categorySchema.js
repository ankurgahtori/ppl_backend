const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const userSchema=new Schema({
    userID:{type:String},
    category:{type:String},
    image:{type:String}
},
{versionKey: false}
);
module.exports=mongoose.model("category",userSchema);