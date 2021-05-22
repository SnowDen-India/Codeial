const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


let opts = {
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey  :'codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoads,done){

        User.findById(jwtPayLoads._id,function(error,user){
            if(error){console.log('Error in finding the user in jwt'); return ;}

            if(user){
                return done(null ,user);
            }else{
                return done(null ,false);
            }
        }) ;   


    
}));

module.exports= passport;