require("dotenv").config();
const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_LOG,
      pass: process.env.EMAIL_PASS,
    },
});

//Send Contact Email
const sendEmail = async (req, res) => {

  console.log(req.body);

    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
  
    let saveUser = await contact.save();
    console.log(`User stored in the DB ${contact}`);

    const emailResponse = async () => {
      // send mail with defined transport object
      try{
        const info = await transporter.sendMail({
          from: '"Sabrina del Valle" <is.sabrinadelvalle@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: "Confirmation Email", // Subject line
          text: "Confirmation Email", // plain text body
          html: `<h2 style='color:rgb(72, 70, 70)'>Sabrina del Valle</h2> <span style='display:inline-block'>Web developer</span> <br /> <p style='color:grey'>Hello ${req.body.name}, thanks for your interest, I will reply soon. Best Regards! </p>`, // html body
        })
      }catch(err){
        res.send(err)
      }
      
    }

    emailResponse();

    res.json(JSON.stringify(contact));
}

module.exports = {
    sendEmail,
};