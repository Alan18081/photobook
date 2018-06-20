const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../../models/User');

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  User.findById(id).then(user => done(null,user));
});


passport.use('local.signup', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req,email,password,done) => {
      try {
        const user = await User.findOne({
          email: req.body.email
        });
        if (user) {
          return done(null,false);
        }
        else {
          const newUser = new User({
            email,
            username: req.body.username
          });
          newUser.password = newUser.encryptPassword(password);
          await newUser.save();
          return done(null, newUser);
        }
      }
      catch(error) {
        console.log('Error',error);
        return done(error);
      }
    }
  )
);

passport.use('local.login',
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req,email,password,done) => {
      try {
        const user = await User.findOne({
          email
        });
        if (!user) {
          return done(null,false,[{
            error: 'Такой пользователь не существует'
          }]);
        }
        if(!user.validatePassword(password)) {
          return done(null,false,[{
            error: 'Неверный пароль'
          }])
        }
        return done(null, user);
      }
      catch (error) {
        console.log('Error', error);
        return done(error);
      }
    }
  )
);