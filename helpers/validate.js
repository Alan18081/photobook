exports.registerValidation = async (req,res,next) => {
    req.checkBody('username','Имя пользователя не может быть пустым').notEmpty();
    req.checkBody('email','Email не может быть пустым').notEmpty();
    req.checkBody('email','Email введен неправильно').isEmail();
    req.checkBody('password','Пароль не может быть пустым').notEmpty();
    req.checkBody('password','Пароль не может быть меньше 8 символов').isLength({min: 8});
    try {
      const results = await req.getValidationResult();
      const errors = results.array();
      if(errors.length > 0) {
        const messages = [];
        errors.forEach(error => messages.push({
          error: error.msg
        }));
        res.send({errors: messages});
      }
      else {
        next();
      }
    }
    catch (error) {
      console.log(error);
      next();
    }
};

exports.loginValidation = async (req,res,next) => {
  req.checkBody('email','Email не может быть пустым').notEmpty();
  req.checkBody('email','Email введен неправильно').isEmail();
  req.checkBody('password','Пароль не может быть пустым').notEmpty();
  req.checkBody('password','Пароль не может быть меньше 8 символов').isLength({min: 8});
  try {
    const results = await req.getValidationResult();
    const errors = results.array();
    if(errors.length > 0) {
      const messages = [];
      errors.forEach(error => messages.push({
        error: error.msg
      }));
      res.send({errors: messages});
    }
    else {
      next();
    }
  }
  catch (error) {
    console.log(error);
    next();
  }
};

