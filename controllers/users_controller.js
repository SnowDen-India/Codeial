const User=require('../models/user');



module.exports.profile = function(request, response){
    return response.render('home',{
        title:"profile"
  });

}

//rendering the sign up page
module.exports.signUp=function(request,response){

return response.render('user_sign_up',{
        title:"Codeial |  Sign Up"
});


}


//rendering the sign in page
module.exports.signIn=function(request,response){
 
  return response.render("user_sign_in",{
          title:"Codeial | Sign IN"
  });


}
// get the sign up data
module.exports.create=function(request,response){

        //check password and confirm password are equal or not;
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

module.exports.createSession=function(Request,response){

//todo later

}