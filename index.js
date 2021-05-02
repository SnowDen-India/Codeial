const express = require('express');
//cookie parser
const cookieParser=require('cookie-parser');
const app = express();
const port=8000;
const expresslayouts =require('express-ejs-layouts');
//mongoose
const db= require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport =require('passport');
const LocalStrategy =require('./config/passport-local-strategies');

const MongoStore =require('connect-mongodb-session')(session);

const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({

    src:'./assets/scss',
    dest:'./assets/css',
    debug:'true',
    outputStyle:'expanded',
    prefix:'/css'


}));



//middleware
app.use(express.urlencoded());


app.use(cookieParser());

//layouts

app.use(expresslayouts);

//static files firing
app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScript',true);

//view engine

app.set('view engine','ejs');
app.set("views", "./views");

///mongostore session is used to stor session cookie in the db
app.use(session({
      name:'codeial',
      secret:'blahsomething',
      saveUninitialized:false,
      resave:false,
      cookie:{
          maxAge:(1000*60*100)
      },
     store: new MongoStore({
         mongooseConnection:db,
         autoRemove:'disabled'
     },function(error){
         console.log(error || 'connect-mongodb setup is ok')
     }
     )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); 

//routes
app.use('/',require('./routes'));

//server listening
app.listen(port,function(error){
     if(error){
         console.log(`Error in Runnin the Server:${error}`);
     }
    
     console.log(`Server is running on port:${port}`);


});

