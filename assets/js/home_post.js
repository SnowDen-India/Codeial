{
    //method to submit the form data for new post using AJAX
   let createPost = function(){
    
        let   newPostForm = $('#new-post-form');
       
        newPostForm.submit(function(event){
            event.preventDefault();

                $.ajax({
                    type: 'post',
                    url: '/post/create',
                    data: newPostForm.serialize(),
                    success:function(data){
                       let newPost=newPostDom(data.data.post);
                       $('#posts-list-containter>ul').prepend(newPost);
                    },error: function(error){
                        console.log(error.responseText);
                    }
                });



        });

   }

               //method to create a post in DOM
               let newPostDom = function(post){
                   return $(`<li id="post-${post._id}">
                    <p>
                
                      <small>
                         <a class="delete-post-button" href="/post/destroy/${post._id}">
                          X
                         </a>
                       </small>
           
               
                       ${post.content} 
                      <br>
                       <small>
                              ${post.user.name}
                      </small>
                  </p>
               
                   <div class="post-comment">

                       
                       <form action="/comments/create" method="POST">
                          <input type="text" name="content" placeholder="type here to add your comment">
                          <input type="hidden" name="post" value=" ${post._id}">
                          <input type="submit" value="Add Comment">
               
                       </form>
                       <div class="post-comments-lists">
                         
                          <ul id="post-comment-${post._id}">
                        
                          </ul>
                            
               
                       </div>
                       
                     
                
               
               
                   </div>
               
               
               
               
                  </li>`)
               }


  createPost();

}