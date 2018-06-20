const {registerValidation,loginValidation} = require('../helpers/validate');
const passport = require('passport');
const User = require('../models/User');
const crypto = require('crypto');
const resetPassword = require('../services/sendgrid/resetPassword');

module.exports = app => {

  app.post('/api/register',registerValidation,(req,res,next) => {
    passport.authenticate('local.signup',(err,user) => {
      if(err) next(err);
      if(!user) {
        return res.send({errors: [{error: 'Такой пользователь уже существует'}]});
      }
      req.login(user,registerErr => {
        if(registerErr) {
          return next(registerErr);
        }
        return res.send(req.user);
      });
    })(req,res,next);
  });

  app.post('/api/login',loginValidation,(req,res,next) => {
    passport.authenticate('local.login',(err,user,info) => {
      if(err) next(err);
      if(!user) {
        return res.send({errors: info});
      }
      req.login(user,loginErr => {
        if(loginErr) {
          return next(loginErr);
        }
        return res.send(req.user);
      });
    })(req,res,next);
  });

  app.get('/api/current_user', async (req,res) => {
    try {
      if(req.user) {
        const user = await User.findOne({
          _id: req.user._id
        });
        res.send(user);
      }
      else {
        res.send(false);
      }
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/logout',(req,res) => {
    req.logout();
    res.sendStatus(200);
  });

  app.post('/api/resetPassword',async (req,res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({
        email
      });
      if(!user) {
        res.send({
          error: 'Пользователя с таким email не существует'
        });
      }
      else {
        const token = crypto.randomBytes(25).toString('hex');
        user.resetPasswordToken = token;
        await Promise.all([
          resetPassword(email,token),
          user.save()
        ]);
        res.sendStatus(200);
      }
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/api/resetPasswordSuccess/:token', async (req,res) => {
    try {
      const {token} = req.params;
      const user = await User.findOne({
        resetPasswordToken: token
      });
      if(user) {
        res.redirect('/resetPasswordSuccess/' + token);
      }
      else {
        res.sendStatus(404);
      }
    }
    catch(error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post('/api/setNewPassword',async (req,res) => {
    try {
      const {password,token} = req.body;
      const user = await User.findOne({
        resetPasswordToken: token
      });
      if(user) {
        user.password = user.encryptPassword(password);
        await user.save();
        res.sendStatus(200);
      }
      else {
        res.send({
          error: 'Пользователь не найден'
        })
      }
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
};