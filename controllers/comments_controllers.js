const Comment =require('../models/comment');
const Post =require('../models/post');


module.exports.create=function(request,response){

   Post.findById(request.body.post,function(error,post){
       if(post){
           Comment.create({
               content:request.body.content,
               post:request.body.post,
               user:request.user._id
           },function(error,comment){
                if(error){
                console.log('error in create the post');
                return;
            }
             
              post.comments.push(comment);
              post.save();
              response.redirect('/');


           });
       }            



   });



}


//deleting a comment 

module.exports.destroy = function(request,response){
            Comment.findById(request.params.id,function(error,comment){
              
                if(comment.user == request.user.id){
                    let postId =comment.post;
                      comment.remove();
                     Post.findByIdAndUpdate(postId,{$pull:{comments:request.params.id}},function(error,post){
                            return response.redirect('back');
                    });
                }else{
                    return response.redirect('back');
                }

            });


}