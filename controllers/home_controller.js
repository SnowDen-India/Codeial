const Post=require("../models/post");
const User = require('../models/user');

module.exports.home = function(request,response){
    // return response.end("<h1>Express is up for codeil</h1>");
       
    //  console.log(request.cookies);
    //  response.cookie('user_id',25);
    
    //populate tht user
          Post.find({})
          .populate('user')
          .populate({
             path:'comments',
             populate:{
               path:'user'
             }
          })
          .exec(function(error,posts){
           User.find({},function(error,users){
            return response.render('home',{
              title:"Home",
              posts:posts,
              all_users:users
          });
        });
           });
        




}


