const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User =require('../models/user');



//authentication using passport

passport.use(new LocalStrategy({
       usernameField:'email',
       passReqToCallback:true
        
      },
      function(request,email,password,done){
          //find a user and establish their identity

          User.findOne({email:email},function(error,user){

            if(error){
                // console.log('error in finding the user--->passport');
                request.flash('error',error);
                return done(error);
            }

            if(!user || user.password!=password){
                //    console.log('Invalid Username/Password');
                 request.flash('error','Invalid Username/Password');
                   return done(null,false);
            }
            return done(null,user);

          });
      }



));


//serializing the user to decide which key is used to be kept in the cookie

passport.serializeUser(function(user,done){
  done(null,user.id);

});

//deserializing the user from the key in the cookie

passport.deserializeUser(function(id,done){

    User.findById(id,function(error,user){
        if(error){
            console.log('error in finding the user--->passport');
            return done(error);
        }
           return done(null,user);
    });


});

//check if the user is authenticated or not 

passport.checkAuthentication=function(request,response,next){
        
       //if the user is signed in,then pass on the request to the next(controller's action)
       if(request.isAuthenticated()){
           return next();
       }

        //if the user is not signed in 
        return response.redirect('/users/sign-in');

}


passport.setAuthenticatedUser =function(request,response,next){
 
    if(request.isAuthenticated()){
        //request.user containt the current signed user from the session cookie and we are just sending this to the locals for views
        response.locals.user=request.user;
    }

       next();

}



module.exports=passport;
