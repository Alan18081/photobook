const sgMail = require('@sendgrid/mail');
const {sendGridKey} = require('../../config/keys');
const emailTemplate = require('./resetPasswordTemplate');
sgMail.setApiKey(sendGridKey);

module.exports = async (email,token) => {
  try {
    const msg = {
      to: email,
      from: 'photobook@gmail.com',
      subject: 'Ссылка на восстановление пароля',
      html: emailTemplate(email,token)
    };
    await sgMail.send(msg);
  }
  catch(error) {
    console.log(error);
  }
};