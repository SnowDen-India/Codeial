const nodeMailer = require('../config/nodemailer');
const Token = require('../models/token');
const crypto = require('crypto');





exports.resetPassword = (user)=>{

let resetToken = crypto.randomBytes(32).toString('hex');
Token.create({
    user : user._id,
    accessToken : resetToken,
    createdAt :Date.now()

});
const link = `http://localhost:8000/users/passwordReset?token=${resetToken}&id=${user._id}`;

let htmlString=nodeMailer.renderTemplate({user:user,link:link},'/comments/forget-password.ejs');

console.log('inside forgot passsword Mailer');

nodeMailer.transporter.sendMail({
    from:"sujeetcodeial@gmail.com",
    to:user.email,
    subject:"Reset Password",
    html:htmlString
},(error,info)=>{
    if(error){
        console.log('Error in sending mail',error);
        return;
    }
 //   console.log('message send',info);
    return;
}
)





}