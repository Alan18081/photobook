const express = require('express');
const mongoose = require('mongoose');
const cookiesSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
const validator = require('express-validator');
const config = require('./config/keys.js');
const http = require('http');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookiesSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

require('./services/passport/passport');

require('./routes/auth')(app);
require('./routes/profile')(app);
require('./routes/albums')(app);
require('./routes/users')(app);
require('./routes/images')(app);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'client','build')));
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'client','build','main.html'));
  });
}
else {
  app.use(express.static(path.join(__dirname,'client',config.staticPath)));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});
