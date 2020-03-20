const db = require("../schemas/categorySchema");

module.exports = {
    addCategory:(data)=>{
        return new Promise((resolve,reject)=>{
            db.create(data,(err,result)=>{
                if(err){
                    reject();
                }
                else{
                     console.log("New category added  : ",result);
                    resolve(result);
                }
            })
        })
    },
    getPostByID:(data)=>{
        // console.log("serching for data", data);
        return new Promise((resolve,reject)=>{
            db.findOne({'category':data},(err,result)=>{
                // console.log("data after findin ",result);
                if(result){
                    // console.log("category already Exist");
                    reject();
                }
                else{
                    resolve();
                }
            })
        })
    },
    getCategories:()=>{
        return new Promise((resolve,reject)=>{
            db.find({},(err,result)=>{
                if(err){
                    reject();
                }
                else{
                    resolve(result);
                }
            })
        })
    }
}
