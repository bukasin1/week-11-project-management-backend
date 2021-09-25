import sendGridMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const emailkey = process.env.SENDGRID_API_KEY as string;
sendGridMail.setApiKey(emailkey);
console.log('Key: ', emailkey);

// const message = {
//   to: 'oluchi.oraekwe@gmail.com',
//   from: 'chukwukeluoo@gmail.com',
//   subject: 'Test email with Node.js and SendGrid',
//   text: 'This is a test email using SendGrid from Node.js',
//   html: `<strong>'This is a test email using SendGrid from Node.js'</strong>`,
// };

export const sendSignUpmail = async (email: string, body: string) => {
  const message = {
    to: email,
    from: 'chukwukeluoo@gmail.com',
    subject: 'Test email with Node.js and SendGrid',
    text: 'This is a test email using SendGrid from Node.js',
    html: body,
  };

  sendGridMail.send(message);
  // .then(() => console.log('message sent'))
  // .catch(() => console.log('message failed'));
};
