const User = require('../models/User');
const TempUser = require('../models/TempUser');
const mongoose = require('mongoose');
const nev = require('email-verification')(mongoose);
const config = require('../config/keys');

nev.configure({
  verificationURL: config.verificationURL,
  persistentUserModel: User,
  tempUserModel: TempUser,
  tempUserCollection: 'myawesomewebsite_tempusers',
  shouldSendConfirmation: false,
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'gogunov00@gmail.com',
      pass: 'morgan11neosk'
    }
  },
  verifyMailOptions: {
    from: 'Do Not Reply <gogunov00@gmail.com>',
    subject: 'Please confirm account',
    html: `
      <h2>Click the following link to confirm your account:</h2>
      <p><a href="${config.verificationURL}"></a></p>`,
    text: 'Please confirm your account by clicking the following link: ${URL}'
  }
}, (error, options) => {
  if(error) {
    console.log(error);
  }
});

module.exports = nev;