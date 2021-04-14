const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting in mongodb"));

db.once('open',function (){
    console.log("succesfull connecting to database")

    
});


module.exports=db;