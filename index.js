const express = require('express');
const env = require('./config/environment')
const logger = require('morgan');
//cookie parser
const cookieParser=require('cookie-parser');
const app = express();
require('./config/view-helpers')(app);
const port=8000;
const expresslayouts =require('express-ejs-layouts');



//mongoose
const db= require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport =require('passport');
const LocalStrategy =require('./config/passport-local-strategies');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore =require('connect-mongodb-session')(session);

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMdware = require('./config/middleware');

//set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

if(env.name=='development'){
    app.use(sassMiddleware({

        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:'true',
        outputStyle:'expanded',
        prefix:'/css'
    
    
    }));
}




//middleware
app.use(express.urlencoded({extended:false}));


app.use(cookieParser());

//static files firing
app.use(express.static(env.asset_path));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
//layouts

app.use(logger(env.morgan.mode ,env.morgan.options));
app.use(expresslayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//view engine

app.set('view engine','ejs');
app.set("views", "./views");

///mongostore session is used to stor session cookie in the db
app.use(session({
      name:'codeial',
      secret:env.session_cookie_key,
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

app.use(flash());
app.use(customMdware.setFlash);

//routes
app.use('/',require('./routes'));

//server listening
app.listen(port,function(error){
     if(error){
         console.log(`Error in Runnin the Server:${error}`);
     }
    
     console.log(`Server is running on port:${port}`);


});

