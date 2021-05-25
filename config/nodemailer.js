const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    
    service:"gmail",
    host:"smtp-relay.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:'sujeetcodeial',
        pass:'gjptsfdwrhzgiopv'
    }



});


let renderTemplate = function(data,relativePath){
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(error,template){
            if(error){
                console.log('error in rendering template',error);
                return;
            }
            mailHTML= template;
        }
    )
        return mailHTML;       
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}