const express = require('express');
//cookie parser
const cookieParser=require('cookie-parser');
const app = express();
const port=8000;
const expresslayouts =require('express-ejs-layouts');
//mongoose
const db= require('./config/mongoose');
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
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set("views", "./views");


//server listening
app.listen(port,function(error){
     if(error){
         console.log(`Error in Runnin the Server:${error}`);
     }
    
     console.log(`Server is running on port:${port}`);


});

