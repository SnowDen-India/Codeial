const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting in mongodb"));

db.once('open',function (){
    console.log("succesfull connecting to database")

    
});


module.exports=db;