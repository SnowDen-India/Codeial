const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create=function(request,response){
 Post.create({
     content:request.body.content,
     user:request.user._id,
 },function(error,post){
      if(error){
          console.log("error in creating a post");
          return response.redirect('back');
      }
      return response.redirect('back');
  });

}

module.exports.destroy = async function(request,response){

    try{

        let post=  await Post.findById(request.params.id);
             //.id means converting the object id into string  
        if(post.user == request.user.id){
            post.remove();

              await Comment.deleteMany({ post:request.params.id});
              return response.redirect('back');   
       
            }else{
               return response.redirect('back');
        }


    }catch(error){
        console.log('Error',error);
        return;
    }
     
   

}

//    
// Post.findById(request.params.id,function(error,post){
//     //.id means converting the object id into string  
// if(post.user == request.user.id){
//    post.remove();
//  Comment.deleteMany({ post:request.params.id},function(error){
//      return response.redirect('back');   
//  });
// }else{
//    return response.redirect('back');
// }

// });
