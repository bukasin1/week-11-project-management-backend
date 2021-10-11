import sendGridMail from '@sendgrid/mail';
import dotenv from 'dotenv';

const emailkey = process.env.SENDGRID_API_KEY as string;
sendGridMail.setApiKey(emailkey);

export const sendSignUpmail = async (email: string, body: string) => {
  const message = {
    to: email,
    from: 'chukwukeluoo@gmail.com',
    subject: 'Test email with Node.js and SendGrid',
    text: 'This is a test email using SendGrid from Node.js',
    html: body,
  };

  sendGridMail.send(message);
};
