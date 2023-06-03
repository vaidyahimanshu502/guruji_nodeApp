const cron = require('node-cron');
const nodemailer = require('nodemailer');

let mailOptions = {
    from: 'vaidyahimanshu502@gmail.com',
    to: 'req.user.email',
    subject: 'Email from Todo-App: Reminder!',
    text: 'Please complete Your task on time!'
};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vaidyahimanshu502@gmail.com',
      pass: 'cyidlluewxmsfpgu'
    }
});

cron.schedule('* * * * *', () => {
    // Send e-mail
    transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
      });
    });
