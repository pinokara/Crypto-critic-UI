var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: 'eagle.mxlogin.com',
    port: 465,
    auth: {
        user: 'test@galatium.org',
        pass: '=mMSeL*1@f}='
    }
});

var sendMail=({from, to, subject, text, html})=> new Promise((res,rej) =>{
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html // html body
    }


    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log('Error');
            rej()
        } else {
            console.log('mail sent');
            res(response)
        }
    });
})


exports.MailFeatures ={
    sendMail
}

