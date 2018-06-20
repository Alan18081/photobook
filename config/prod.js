const path = require('path');

module.exports = {
  staticPath: path.join(__dirname,'../client/build/uploads'),
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  cloudName: process.env.CLOUD_NAME,
  cloudKey: process.env.CLOUD_KEY,
  cloudSecret: process.env.CLOUD_SECRET
};