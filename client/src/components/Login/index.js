import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm,Field} from 'redux-form';

import {validateAuth} from '../../utils/validate';
import classes from '../../hoc/Auth/index.sass';
import {getCurrentUser} from '../../selectors';
import {login} from '../../actions/auth';

import Button from '../UI/Button/index';
import AuthInput from '../UI/AuthInput/index';
import Auth from '../../hoc/Auth';

import MailIcon from '../../assets/icons/envelope.svg';
import PasswordIcon from '../../assets/icons/password.svg';

const renderLoginErrors = (errors) => errors.map(error => (
  <div className={classes.error} key={error.get('error')}>{error.get('error')}</div>
));

const Login = ({handleSubmit,onLogin,loginErrors}) => {
    return (
      <Auth>
        <div className={classes.head}>
          <h1 className={classes.title}>Добро пожаловать</h1>
          <p className={classes.caption}>Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!</p>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onLogin)}>
          <Field
            Icon={MailIcon}
            name="email"
            component={AuthInput}
            type="email"
            placeholder="Электронная почта"
          />
          <Field
            Icon={PasswordIcon}
            name="password"
            component={AuthInput}
            type="password"
            placeholder="Пароль"
          />
          <div className={classes.controls}>
            <Link to="/resetPassword" className={classes.reset}>Забыли пароль?</Link>
            {loginErrors.size ? renderLoginErrors(loginErrors) : null }
            <Button fluid>Войти</Button>
            <div className={classes.links}>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></div>
          </div>
        </form>
      </Auth>
    );
};

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  loginErrors: state.auth.get('loginErrors')
});

const mapDispatchToProps = dispatch => ({
  onLogin: (userInfo) => dispatch(login(userInfo))
});

export default connect(mapStateToProps,mapDispatchToProps)(
  reduxForm({
    form: 'login',
    destroyOnUnmount: false,
    validate: validateAuth
  })(Login)
);