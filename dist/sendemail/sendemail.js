"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignUpmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const emailkey = process.env.SENDGRID_API_KEY;
mail_1.default.setApiKey(emailkey);
const sendSignUpmail = async (email, body) => {
    const message = {
        to: email,
        from: 'chukwukeluoo@gmail.com',
        subject: 'Test email with Node.js and SendGrid',
        text: 'This is a test email using SendGrid from Node.js',
        html: body,
    };
    mail_1.default.send(message);
};
exports.sendSignUpmail = sendSignUpmail;
//# sourceMappingURL=sendemail.js.map