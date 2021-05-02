const mongoose =require('mongoose');

const postSchema = new mongoose.Schema({
      
           content:{
               type:String,
               required:true
           },

           user:{
               type:mongoose.Schema.types.ObjectId;
               ref:'User'
           }




},{
    timestamp:true
});


const Post = mongoose.models('Post',postSchema);

module.exports=Post;
