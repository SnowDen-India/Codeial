const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create= async function(request,response){
 try { 
   let post= await Post.create({
        content:request.body.content,
        user:request.user._id,
    });
    
     if(request.xhr){
        post = await post.populate('user', 'name').execPopulate();
       return response.status(200).json({
              data:{
                  post:post
              },
               message:"Post created!"
       });
     }   
     request.flash('success', 'Post published without ajax!');
     return response.redirect('back');

 }catch(error){
    request.flash('error',error);
    console.log(err);
    return response.redirect('back');
 }
 


}

// module.exports.create=function(request,response){
//  Post.create({
//     content:request.body.content,
//     user:request.user._id,
// },function(error,post){
//      if(error){
//          console.log("error in creating a post");
//          return response.redirect('back');
//      }
//      return response.redirect('back');
//  });

// }

module.exports.destroy = async function(request,response){

    try{

        let post=  await Post.findById(request.params.id);
             //.id means converting the object id into string  
        if(post.user == request.user.id){
              
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});


            post.remove();

              await Comment.deleteMany({ post:request.params.id});
              if(request.xhr){
                  return response.status(200).json({
                      data:{
                          post_id:request.params.id
                      },
                      message:"Post deleted"
        
                    
                  });
              } 
            //    request.flash('success',message);
            request.flash('success','Post and Assosicated Comment Deleted!');
             
              return response.redirect('back');   
       
            }else{
                request.flash('error','You cannot delete the post')
               return response.redirect('back');
        }


    }catch(error){
        // console.log('Error',error);
        request.flash('Error',error);
        return response.redirect('back');
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
