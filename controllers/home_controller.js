const Post=require("../models/post");
const User = require('../models/user');
const Friends = require('../models/friendship');

module.exports.home =  async function(request,response){
    // return response.end("<h1>Express is up for codeil</h1>");
       
    //  console.log(request.cookies);
    //  response.cookie('user_id',25);
    
    //populate tht user


     // first run this

     try{
      let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
         path:'comments',
         populate:{
           path:'user',
          
         },
         populate:{
          path:'likes'
        }
      }).populate('comments').populate('likes');

      // then this
   let users = await User.find({}); 
   let friends = await Friends.find({}); 
    //then this return 
   return response.render('home',{
         title:"Home",
         posts:posts,
         all_users:users,
         all_friends:friends
   });

     }catch(error){
         console.log('Error',error);
         return;
     }
      

}

// .exec(function(error,posts){
//  function(error,users){
//    return response.render('home',{
//      title:"Home",
//      posts:posts,
//      all_users:users
//  });
