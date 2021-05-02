const User=require('../models/user');



module.exports.profile = function(request, response){


        return response.render('profile',{
             title:'profile'

        });

        // if(request.cookies.user_id){
        
        //         User.findById(request.cookies.user_id,function(error,user){

        //                    if(user){
        //                            return response.render('profile',{
        //                                    title:"user_profile",
        //                                    user:user
        //                            });
        //                    }
        //                    return response.redirect('/users/sign-in');


        //         });





        // }else{
      
        //                 return response.redirect('/users/sign-in');
                
        // }



        

}

//rendering the sign up page
module.exports.signUp=function(request,response){

   if(request.isAuthenticated()){
        return   response.redirect('/users/profile');
   }


return response.render('user_sign_up',{
        title:"Codeial |  Sign Up"
});


}


//rendering the sign in page
module.exports.signIn=function(request,response){
        if(request.isAuthenticated()){
           return response.redirect('/users/profile');
        }
     
     
  return response.render("user_sign_in",{
          title:"Codeial | Sign IN"
  });


}
// get the sign up data
module.exports.create=function(request,response){

       // check password and confirm password are equal or not;
            console.log(request.body);
         if(request.body.password!=request.body.confirm_password){
                 return response.redirect('back');
         }

        User.findOne({email:request.body.email},function(error,user){

                if(error){
                        console.log("error in finding the user in signing up");
                        return;
                }

               if(!user){
                       User.create(request.body,function(error,user){
                               if(error){
                                console.log("error in creating the user while  signing up");
                                return; 
                               }
                               return response.redirect('/users/sign-in');
                       });

               }else{
                       return response.redirect('back');
               }



        });

           
}

//sign-in and session

module.exports.createSession=function(request , response){


return response.redirect('/');

//stetps to authentication

//1.find the user

// User.findOne({email:request.body.email},function(error,user){
//         if(error){
//                 console.log('error in finding the user in signing in');
//                 return;
//         }

//         //2.handle user found

//        if(user){
//        //2.1 handle password mismatch
//        if(user.password!=request.body.password){
//                return response.redirect('back');
//        }

//        //2.2 handle session creation

//        response.cookie('user_id',user.id);
//        return response.redirect('/users/profile');


//        }else{
//            //3 handle user not found :(

//            return response.redirect('back');

//        }



//        });




};



module.exports.destroySession=function(request,response){
        request.logout();
        return response.redirect('/');





        // let id=request.cookies.user_id;

        // User.findByIdAndDelete(id,function(error){
        //         if(error){
        //                 console.log('error in signout');
        //                 return;
        //         }
        //         return response.redirect('sign-in');
        // })
          




}