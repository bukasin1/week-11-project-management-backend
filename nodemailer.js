import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'isintumejenny@gmail.com',
    pass: 'Jen.ny18',
  },
});
const sendMail = (email, body) => {
  const mailOptions = {
    from: 'isintumejenny@gmail.com',
    to: email,
    subject: 'Successfully Signed up',
    html: body,
  };
  return transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error Occus: ', err);
    }
    console.log('Email sent!!:' + data);
  });
};
export default sendMail;
