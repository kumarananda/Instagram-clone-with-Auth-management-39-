
import nodemailer from 'nodemailer';


// create Email 
export const sendEmail = async (to, subject, text, html) => {

    try{
        console.log(to);
        console.log(subject);
        console.log(text);
        console.log(html);
        
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "anandamernprac@gmail.com",
              pass: process.env.GMAIL_APP_PASS
            }
        });
        
        await transport.sendMail({
            from    : "anandamernprac@gmail.com",
            to      : to,
            subject : subject,
            text    : text ,
            html    :html
        })


    }catch(error){
        console.log(error);
    }
}

// mailtrap note
// try{

//     let transport = nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "7f5026911c5592",
//           pass: "00824fc0cef5b7"
//         }
//     });
    
//     await transport.sendMail({
//         from    : "kumaranandainfo@gmail.com",
//         to      : to,
//         subject : subject,
//         text    : text ,
//         html    :html
        
//     })


// }catch(error){
//     console.log(error);
// }

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: testAccount.user, // generated ethereal user
//         pass: testAccount.pass, // generated ethereal password
//       },
//     });
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Fred Foo 👻" <foo@example.com>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }
  
//   main().catch(console.error);


