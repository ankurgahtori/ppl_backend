const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const userSchema=new Schema({
    username: {type:String},
  password: {type:String},
  email: {type:String},
  fname: {type:String},
  lname: {type:String},
  select: {type:String}
},
{versionKey: false}
);
module.exports=mongoose.model("register",userSchema);