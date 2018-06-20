import isValidEmail from 'is-valid-email';

export const validateAuth = (values) => {
  const errors = {};
  if(!values.email || values.email === '') {
    errors.email = 'Введитие email';
  }
  else if(!isValidEmail(values.email)) {
    errors.email = 'Введите email правильно';
  }

  if(!values.password || values.password === '') {
    errors.password = 'Введите пароль';
  }
  else if(values.password && values.password.length < 8) {
    errors.password = 'Ваш пароль должен быть как минимум 8 символов';
  }

  if(!values.username || values.username === '') {
    errors.username = 'Имя не может быть пустым';
  }
  return errors;
};

export const validateComment = ({text}) => {
  const errors = {};
  if(text === '') {
    errors.text = 'Комментарий не может быть пустым';
  }
  return errors;
};

export const validateSearch = ({query}) => {
  const errors = {};
  if(query === '') {
    errors.query = 'Введите свой запрос';
  }
  return errors;
};

export const validateResetPassword = ({password,confirmPassword}) => {
  const errors = {};
  if(!password || password === '') {
    errors.password = 'Введите пароль';
  }
  else if(password && password.length < 8) {
    errors.password = 'Ваш пароль должен быть как минимум 8 символов';
  }
  if(!confirmPassword || confirmPassword === '') {
    errors.confirmPassword = 'Введите пароль';
  }
  else if(confirmPassword && confirmPassword.length < 8) {
    errors.confirmPassword = 'Ваш пароль должен быть как минимум 8 символов';
  }
  return errors;
};

export const validateAlbum = ({name,description}) => {
  const errors = {};
  if(name === '') {
    errors.name = 'Название не может быть пустым';
  }
  if(description === '') {
    errors.description = 'Описание не может быть пустым';
  }
  return errors;
};
