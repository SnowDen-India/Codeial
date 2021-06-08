const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({

           user:{
               type:mongoose.Schema.Types.ObjectId,
               ref:"User",
               required:true
           },
           
           accessToken:{
               type:String,
               required:true
           },

           createdAt: {
              type: Date,
              default: Date.now,
               expires: 3600, // this will expires in seconds
           }
           


});
const Token =mongoose.model('Token',tokenSchema)
module.exports=Token;