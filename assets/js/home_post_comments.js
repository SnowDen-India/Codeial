//let's implemement this via classes

//this class would be initialized for every post on the page
//1.when the page loads
//2.Creation of every post dynamically via AJAX


/*********************** 
 * this class should not be inside any method.
***********************/

class PostComments{
    //constructor is used to initialize the instance of the classes whenever a new instance is created
   
       constructor(postId){
           this.postId=postId;
           this.postContainer =$(`#post-${postId}`);
           this.newCommentForm =$(`#post-${postId}-comments-form`);
           this.createComment(postId);
   
           let self =this;
           //call for all the existing comments
           $(' .delete-comment-button',this.postContainer).each(function(){
                 self.deleteComment($(this));
           });
   
       }
   
       createComment(postId){
           let pSelf =this;
           this.newCommentForm.submit(function(event){
               event.preventDefault();
               let self=this;
   
                 $.ajax({
                     type:'post',
                     url:'/comments/create',
                     data:$(self).serialize(),
                     success:function(data){
                         let newComment =pSelf.newCommentDom(data.data.comment);
                       //   check the spelling of comments
                         $(`#post-comments-${postId}`).prepend(newComment);
                         pSelf.deleteComment($(' .delete-comment-button',newComment))
                         
                          new Noty({
                               theme:'relax',
                               text:"Comment Published ",
                               type:'success',
                               layout:'topRight',
                               timeout:1500
   
   
                          }).show();
                       },error:function(error){
                           console.log(error.responseText);
                       }
                 }) ;
   
   
   
   
   
           });
       }
         
       newCommentDom(comment){
               // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
               return $(`<li id="comment-${ comment._id }">
               <p>
                   
                   <small>
                       <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                   </small>
                   
                   ${comment.content}
                   <br>
                   <small>
                       ${comment.user.name}
                   </small>
               </p>    
   
              </li>`);
           }
   
           deleteComment(deleteLink){
               $(deleteLink).click(function(e){
                   e.preventDefault();
       
                   $.ajax({
                       type: 'get',
                       url: $(deleteLink).prop('href'),
                       success: function(data){
                           $(`#comment-${data.data.comment_id}`).remove();
       
                           new Noty({
                               theme: 'relax',
                               text: "Comment Deleted",
                               type: 'success',
                               layout: 'topRight',
                               timeout: 1500
                               
                           }).show();
                       },error: function(error){
                           console.log(error.responseText);
                       }
                   });
       
               });
           }
   
   
   }
   
// {
//     //let's implemement this via classes

// //this class would be initialized for every post on the page
// //1.when the page loads
// //2.Creation of every post dynamically via AJAX


// class PostComments{
//  //constructor is used to initialize the instance of the classes whenever a new instance is created

//     constructor(postId){
//         this.postId=postId;
//         this.postContainer =$(`#post-${postId}`);
//         this.newCommentForm =$(`#post-${postId}-comments-form`);
//         this.createComment(postId);

//         let self =this;
//         //call for all the existing comments
//         $(' .delete-comment-button',this.postContainer).each(function(){
//               self.deleteComment($(this));
//         });

//     }

//     createComment(postId){
//         let pSelf =this;
//         this.newCommentForm.submit(function(e){
//             e.preventDefault();
//             let self=this;

//               $.ajax({
//                   type:'post',
//                   url:'/comments/create',
//                   data:$(self).serialize(),
//                   success:function(data){
//                       let newComment =pSelf.newCommentDom(data.data.comment);
//                       $(`#post-comments-${postId}`).prepend(newComment);
//                       pSelf.deleteComment($(' .delete-comment-button',newComment))
                      
//                        new Noty({
//                             theme:'relax',
//                             text:"Comment Published!",
//                             type:'success',
//                             layout:'topRight',
//                             timeout:1500


//                        }).show();
//                     },error:function(error){
//                         console.log(error.responseText);
//                     }
//               }) ;





//         });
//     }
      
//     newCommentDom(comment){
//             // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
//             return $(`<li id="comment-${ comment._id }">
//             <p>
                
//                 <small>
//                     <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
//                 </small>
                
//                 ${comment.content}
//                 <br>
//                 <small>
//                     ${comment.user.name}
//                 </small>
//             </p>    

//            </li>`);
//         }

//         deleteComment(deleteLink){
//             $(deleteLink).click(function(e){
//                 e.preventDefault();
    
//                 $.ajax({
//                     type: 'get',
//                     url: $(deleteLink).prop('href'),
//                     success: function(data){
//                         $(`#comment-${data.data.comment_id}`).remove();
    
//                         new Noty({
//                             theme: 'relax',
//                             text: "Comment Deleted using ajax",
//                             type: 'success',
//                             layout: 'topRight',
//                             timeout: 1500
                            
//                         }).show();
//                     },error: function(error){
//                         console.log(error.responseText);
//                     }
//                 });
    
//             });
//         }


// }








// }









// // {
//     let createComment = function(){
    
//     let   newCommentForm = $('#new-comment-form');
   
//     newCommentForm.submit(function(event){
//         event.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentForm.serialize(),
//                 success:function(data){
//                     console.log(data);
//                   let newComment=newCommentDom(data.data.comment);
//                    $('#post-comments-lists>ul').prepend(newComment);
//                    deletePost($('delete-comment-button',newComment));
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });



//     });

// }

// //method to create a comment in the DOM
//           let newCommentDom = function(comment){
//               return $(`<div class="post-comment">
// =
               
//                <form action="/comments/create" id ="new-comment-form" method="POST">
//                   <input type="text" name="content" placeholder="type here to add your comment">
//                   <input type="hidden" name="post" value="${post._id}">
//                   <input type="submit" value="Add Comment">
       
//                </form>
//                <div class="post-comments-lists">
                 
//                   <ul id="post-comment-${post._id}">

                        
//                         <li id="delete-comment-list">
//                         <p>
//                                <small>
//                                   <a class="delete-comment-button" href="/comments/destroy/${comment._id}">
//                                    X
//                                   </a>
//                                 </small>
//                             ${comment.content}
                          
//                             <br>
//                             <small>
//                                ${comment.user.name}
//                             </small>
//                          </p>
//                     </li>
                     
//                      <% } %>
//                   </ul>
                    
       
//                </div>
//                `)



//           }

//    //method to delete a comment from DOM

// //    let deleteComment = function(deleteLink){
// //     $(deleteLink).click(function(event){
// //           event.preventDefault();
          
// //           $.ajax({
// //               type:'get',
// //               url:$(deleteLink).prop('href'),
// //               success:function(data){
// //                   $(`#post-${data.data.post._id}`).remove();


// //               },error : function(error){
// //                   console.log(error.responseText);
// //               }

// //           });
// //     });
// // }








//           createComment();
//         }