const nodemail = require("nodemailer");
const {userEmail, password} = require("../config/index");

const sendEmail = async ({emailTo, subject, code, content}) => {
    const transporter = nodemail.createTransport({
        host: "smtp.gmail.com", 
        port:587, 
        secure: false, 
        auth: {
            user: userEmail, 
            pass: password
        }
    })

    const message =  {
        to: emailTo , 
        subject , 
        html:`
        <div> 
        <h3> Use this below code to ${content} </h3> 
        <p> <strong>Code: </strong> ${code} </p>
        ` ,
    }

    await transporter.sendMail(message)
}







module.exports = sendEmail ;