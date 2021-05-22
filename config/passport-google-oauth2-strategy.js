const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({

    clientID:"10753266519-phhn9tmdrrkqk8qukcdnt99e6os866bd.apps.googleusercontent.com",
    clientSecret:"NZLPNnHM6ZWOSGEe2Al0cm8_",
    callbackURL:"http://localhost:8000/users/auth/google/callback"

},function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(error,user){
        if(error){
            console.log('error in google Strategy-passport',error);
            return;
        }
       
         console.log(profile);

         if(user){
             //if found then set this user as req.user
             return done(null,user);
         }else{
             //if not found create the user and set it as req.user
             User.create({
                 name:profile.displayName,
                 email:profile.emails[0].value,
                 password:crypto.randomBytes(20).toString('hex')
             },function(error,user){
                 if(error){
                    console.log('error in creating google Strategy-passport',error);
                    return;
                 }
                 return done(null,user);
             
             });
         }



    });
}
));
module.exports =passport;